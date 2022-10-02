import { DirectionEntity } from '@app/api/direction/direction.entity';
import { UserEntity } from '@app/api/user/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
  ) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(process.env.ALGORITHM_CRON)
  handleCron() {
    this.logger.debug('Алгоритм Гейля-Шепли');
  }

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
}
