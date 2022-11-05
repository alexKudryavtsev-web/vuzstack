import { ParserModule } from '@app/parser/parser.module';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
  imports: [ParserModule],
  controllers: [AdminController],
})
export class AdminModule {}
