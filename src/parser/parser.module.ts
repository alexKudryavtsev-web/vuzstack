import { Module } from '@nestjs/common';
import { ParserService } from '@app/parser/parser.service';

@Module({
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule {}
