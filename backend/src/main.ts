import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/filter-handled.exception';
import { CatchEverythingFilter } from './exceptions/filter-unhandled.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Filter request
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter)); // use global filter

  // Config CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
