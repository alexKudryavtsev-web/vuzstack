import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from './session/session.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { ImageModule } from './cloudinary/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { DirectionModule } from './direction/direction.module';
import { MarkModule } from './mark/mark.module';

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
      rootPath: join(__dirname, '..', 'client', 'build'),
      exclude: ['/api*'],
    }),
    UserModule,
    SessionModule,
    ImageModule,
    ProfileModule,
    DirectionModule,
    MarkModule,
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
