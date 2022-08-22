import { Module } from '@nestjs/common';
import { DirectionService } from '@app/direction/direction.service';
import { DirectionController } from '@app/direction/direction.controller';

@Module({
  providers: [DirectionService],
  controllers: [DirectionController],
})
export class DirectionModule {}
