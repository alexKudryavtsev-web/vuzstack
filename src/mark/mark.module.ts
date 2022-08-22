import { Module } from '@nestjs/common';
import { MarkController } from '@app/mark/mark.controller';
import { MarkService } from './mark.service';

@Module({
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
