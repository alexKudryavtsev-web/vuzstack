import { ImporterService } from '@app/parser/importer.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LogicService } from '@app/logic/logic.service';
import { ImportDto } from '@app/api/admin/dto/import.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly importerService: ImporterService,
    private readonly logicService: LogicService,
  ) {}

  @Post('import')
  async createImport(@Body() importDto: ImportDto): Promise<void> {
    await this.importerService.createImport(importDto.deep);
  }

  @Post('logic')
  async callLogic(): Promise<void> {
    await this.logicService.calculate();
  }
}
