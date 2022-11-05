import { ImporterService } from '@app/parser/importer.service';
import { Controller, Post } from '@nestjs/common';
import { LogicService } from '@app/logic/logic.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly importerService: ImporterService,
    private readonly logicService: LogicService,
  ) {}

  @Post('import')
  async createImport(): Promise<void> {
    await this.importerService.createImport();
  }

  @Post('logic')
  async callLogic(): Promise<void> {
    await this.logicService.calculate();
  }
}
