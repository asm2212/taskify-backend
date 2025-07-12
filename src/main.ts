import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthExceptionFilter } from './common/filters/auth-exception.filter';
import { TaskExceptionFilter } from './common/filters/task-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global exception filter
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new AuthExceptionFilter(),
    new TaskExceptionFilter(),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  new Logger('Bootstrap').log(`Server running on port ${port}`);
}

bootstrap();
