import { ImporterService } from '@app/parser/importer.service';
import { Controller, Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private readonly importerService: ImporterService) {}

  @Post('import')
  async createImport(): Promise<void> {
    await this.importerService.createImport();
  }
}
