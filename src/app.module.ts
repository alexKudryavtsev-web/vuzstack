import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from '@app/api/user/user.module';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from '@app/api/session/session.module';
import { AuthMiddleware } from '@app/api/user/middlewares/auth.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { CloudinaryModule } from '@app/cloudinary/cloudinary.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from '@app/api/profile/profile.module';
import { DirectionModule } from '@app/api/direction/direction.module';
import { MarkModule } from '@app/api/mark/mark.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from '@app/tasks/task.module';
import { SettingsModule } from '@app/api/settings/settings.module';
import { LogicModule } from '@app/logic/logic.module';
import { ArticleModule } from '@app/api/article/article.module';
import { ParserModule } from '@app/parser/parser.module';
import { AdminModule } from '@app/api/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ThrottlerModule.forRoot({
      ttl: Number(process.env.TTL),
      limit: Number(process.env.LIMIT),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static/',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'build'),
      exclude: ['/api*'],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    SessionModule,
    CloudinaryModule,
    ProfileModule,
    DirectionModule,
    MarkModule,
    TaskModule,
    SettingsModule,
    LogicModule,
    ArticleModule,
    ParserModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
