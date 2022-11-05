import { LogicService } from '@app/logic/logic.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly logicService: LogicService) {}

  @Cron(process.env.ALGORITHM_CRON)
  async handleCron() {
    await this.logicService.calculate();
  }
}
