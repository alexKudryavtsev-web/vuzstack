import { EmailService } from '@app/email/email.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionEntity } from '../api/direction/direction.entity';
import { UserEntity } from '../api/user/user.entity';

/*
Берем все направления и формирует map
Берем всех абит и формируем stack
Берем всех абит., добавляем их список, удаляем из stack, удаляем в нем первый priority
Сортируем значения map по баллам абит.
Тем, кто вышел за бюджетные места, возвращаем их в stack
Если у всех абит. нет больше мест, то завершаем
*/

@Injectable()
export class LogicService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
    private readonly emailService: EmailService,
  ) {}

  async calculate(): Promise<void> {
    const applicants = await this.userRepository.find({
      where: { profile: { ready: true } },
      relations: ['marks'],
    });
    const directions = await this.directionRepository.find();

    const abitMap: Map<DirectionEntity, UserEntity[]> = new Map();

    // allow abitMap
    for (const direction of directions) {
      abitMap.set(direction, []);
    }
    const failed: UserEntity[] = [];

    while (!this._isComplete(applicants)) {
      while (applicants.length) {
        const anyUser = applicants.shift();

        if (!anyUser.priority.length) {
          failed.push(anyUser);
          continue;
        }

        const directionId = Number(anyUser.priority.shift());
        const direction = directions.find(
          (anyDirection) => directionId === anyDirection.id,
        );

        const competitors = abitMap.get(direction);

        abitMap.set(
          direction,
          this.sortAbit(competitors.concat(anyUser), direction),
        );
      }

      // weed out of budget places
      const weeded = this._weed(abitMap);
      applicants.push(...weeded);
    }

    await this._saveResults(failed.concat(applicants), abitMap);
  }

  sortAbit(abit: UserEntity[], direction: DirectionEntity): UserEntity[] {
    return abit.sort(
      (a, b) =>
        this._calculateScore(b, direction) - this._calculateScore(a, direction),
    );
  }

  _isComplete(users: UserEntity[]) {
    for (const user of users) {
      if (user.priority.length != 0) {
        return false;
      }
    }
    return true;
  }

  _calculateScore(user: UserEntity, direction: DirectionEntity): number {
    let score = 0;

    for (const exam of direction.requiredExams) {
      const mark = user.marks.find((mark) => mark.exam === exam);
      score += mark.result;
    }

    const pointsByOptionExams = [];
    for (const exam of direction.optionalExams) {
      const mark = user.marks.find((mark) => mark.exam === exam);

      if (mark) {
        pointsByOptionExams.push(mark.result);
      }
    }

    score += Math.max(...pointsByOptionExams);

    return score;
  }

  _weed(abitMap: Map<DirectionEntity, UserEntity[]>): UserEntity[] {
    const weeded: UserEntity[] = [];

    for (const [direction, users] of abitMap) {
      weeded.push(...users.slice(direction.budgetPlaces));

      abitMap.set(direction, users.slice(0, direction.budgetPlaces));
    }

    return weeded;
  }

  async _saveResults(
    failed: UserEntity[],
    abitMap: Map<DirectionEntity, UserEntity[]>,
  ): Promise<void> {
    for (const user of failed) {
      const clearUser = await this.userRepository.findOne({
        where: { id: user.id },
      });

      clearUser.isProcessed = true;

      await this.userRepository.save(clearUser);

      this.emailService.sendRegret(clearUser.email);
    }

    for (const [direction, abits] of abitMap) {
      const clearDirection = await this.directionRepository.findOne({
        where: { id: direction.id },
        relations: ['abits', 'vuz'],
      });

      for (const abit of abits) {
        const clearAbit = await this.userRepository.findOne({
          where: { id: abit.id },
          relations: ['result'],
        });

        clearAbit.result = direction;
        clearAbit.isProcessed = true;

        await this.userRepository.save(clearAbit);

        clearDirection.abits.push(clearAbit);
        await this.directionRepository.save(clearDirection);

        this.emailService.sendCongratulations(
          clearAbit.email,
          clearDirection.vuz.fullName,
          clearDirection.name,
        );
      }
    }
  }
}
