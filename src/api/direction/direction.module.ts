import { Module } from '@nestjs/common';
import { DirectionService } from '@app/api/direction/direction.service';
import { DirectionController } from '@app/api/direction/direction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionEntity } from '@app/api/direction/direction.entity';
import { VuzEntity } from '@app/api/direction/vuz.entity';
import { UserEntity } from '@app/api/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectionEntity, VuzEntity, UserEntity])],
  providers: [DirectionService],
  controllers: [DirectionController],
  exports: [DirectionService],
})
export class DirectionModule {}
