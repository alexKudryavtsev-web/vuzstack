import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionEntity } from '../direction/direction.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class LogicService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
  ) {}

  async calculate(): Promise<void> {
    console.log('HERE');
  }
}

/*
  async calculate() {
    const result: { direction: DirectionEntity; abit: UserEntity[] }[] = [];

    const users = await this.userRepository.find({
      where: {
        profile: {
          ready: true,
        },
      },
    });

    while (!this._isComplete(users)) {}
  }

  async _isComplete(users: UserEntity[]) {
    for (const user of users) {
      if (user.directions.length != 0) {
        return false;
      }
    }
    return true;
  }

  async _calculateScore(user: UserEntity, direction: DirectionEntity) {
    let score = 0;

    for (const exam of direction.requiredExams) {
      const mark = user.marks.find((mark) => mark.exam === exam);

      if (!mark) {
        return 0;
      }

      score += mark.result;
    }

    return score;
  }
*/
