import { Module } from '@nestjs/common';
import { DirectionService } from '@app/api/direction/direction.service';
import { DirectionController } from '@app/api/direction/direction.controller';

@Module({
  providers: [DirectionService],
  controllers: [DirectionController],
})
export class DirectionModule {}
