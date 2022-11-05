import { ParserModule } from '@app/parser/parser.module';
import { Module } from '@nestjs/common';
import { LogicModule } from '@app/logic/logic.module';
import { AdminController } from '@app/api/admin/admin.controller';

@Module({
  imports: [ParserModule, LogicModule],
  controllers: [AdminController],
})
export class AdminModule {}
