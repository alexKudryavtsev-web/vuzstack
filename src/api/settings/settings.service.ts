import { Injectable } from '@nestjs/common';
import { ExamEnum } from '../mark/mark.entity';
import { SettingsInterface } from './types/settings.interface';

@Injectable()
export class SettingsService {
  async readSettings(): Promise<SettingsInterface> {
    return {
      exams: Object.values(ExamEnum),
      maxAmountDirection: Number(process.env.MAX_AMOUNT_DIRECTION),
    };
  }
}
