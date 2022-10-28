import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { ProfileService } from '@app/api/profile/profile.service';
import { UserEntity } from '@app/api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';
import { DirectionService } from '../direction/direction.service';
import { DirectionEntity } from '../direction/direction.entity';
import { VuzEntity } from '../direction/vuz.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { ArticleEntity } from '../article/article.entity';
import { ParserService } from '@app/parser/parser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
      UserEntity,
      DirectionEntity,
      VuzEntity,
      ProfileEntity,
      ArticleEntity,
    ]),
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    ProfileService,
    CloudinaryService,
    DirectionService,
    ParserService,
  ],
})
export class SessionModule {}
