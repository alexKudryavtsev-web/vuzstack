import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsInterface } from './types/settings.interface';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async readSettings(): Promise<SettingsInterface> {
    return await this.settingsService.readSettings();
  }
}
