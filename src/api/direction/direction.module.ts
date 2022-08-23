import { Module } from '@nestjs/common';
import { DirectionService } from '@app/api/direction/direction.service';
import { DirectionController } from '@app/api/direction/direction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionEntity } from '@app/api/direction/direction.entity';
import { VuzEntity } from '@app/api/direction/vuz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectionEntity, VuzEntity])],
  providers: [DirectionService],
  controllers: [DirectionController],
})
export class DirectionModule {}
