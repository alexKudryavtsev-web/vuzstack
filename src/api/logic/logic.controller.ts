import { Controller, Post } from '@nestjs/common';
import { LogicService } from './logic.service';

@Controller('logic')
export class LogicController {
  constructor(private readonly logicService: LogicService) {}

  @Post()
  async calculate(): Promise<void> {
    await this.logicService.calculate();
  }
}
