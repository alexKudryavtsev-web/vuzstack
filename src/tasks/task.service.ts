import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(process.env.ALGORITHM_CRON)
  handleCron() {
    this.logger.debug('Алгоритм Гейля-Шепли');
  }
}
