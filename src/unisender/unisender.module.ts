import { Module } from '@nestjs/common';
import { UnisenderSerivce } from './unisender.service';

@Module({
  providers: [UnisenderSerivce],
})
export class UnisenderModule {}
