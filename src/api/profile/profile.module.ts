import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { UserEntity } from '@app/api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from '@app/api/profile/profile.controller';
import { ProfileService } from '@app/api/profile/profile.service';
import { DirectionService } from '@app/api/direction/direction.service';
import { DirectionEntity } from '@app/api/direction/direction.entity';
import { VuzEntity } from '@app/api/direction/vuz.entity';
import { ProfileEntity } from '@app/api/profile/profile.entity';
import { ArticleEntity } from '../article/article.entity';
import { ParserService } from '@app/parser/parser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DirectionEntity,
      VuzEntity,
      ProfileEntity,
      ArticleEntity,
    ]),
  ],
  controllers: [ProfileController],
  providers: [
    CloudinaryService,
    ProfileService,
    DirectionService,
    ParserService,
  ],
})
export class ProfileModule {}
