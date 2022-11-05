import { Module } from '@nestjs/common';
import { ParserService } from '@app/parser/parser.service';
import { ImporterService } from '@app/parser/importer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VuzEntity } from '@app/api/direction/vuz.entity';
import { DirectionEntity } from '@app/api/direction/direction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VuzEntity, DirectionEntity])],
  providers: [ParserService, ImporterService],
  exports: [ParserService, ImporterService],
})
export class ParserModule {}
