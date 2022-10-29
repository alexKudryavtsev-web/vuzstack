import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';
import { OctopusService } from './octopus.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' }), HttpModule],
  providers: [EmailService, EmailProcessor, OctopusService],
  exports: [EmailService, OctopusService],
})
export class EmailModule {}
