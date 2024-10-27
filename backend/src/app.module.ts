import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/filter-handled.exception';
import { CatchEverythingFilter } from './exceptions/filter-unhandled.exception';
import { ConfigModule } from '@nestjs/config';

// Mongo db
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Config properties from .env
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    // Connect to mongodb atlas, you must place this below the ConfigModule to make sure the env variables are loaded
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      connectionName: 'users',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
