import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/filter-handled.exception';
import { CatchEverythingFilter } from './exceptions/filter-unhandled.exception';

// Mongo db
import { MongooseModule } from '@nestjs/mongoose';

const routes: string[] = ['/auth', '/users'];

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://honghung123:r6AQWcO2eldAp7Yu@cluster0.ph0y1kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        connectionName: 'users',
      },
    ),
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
