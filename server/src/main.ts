import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyLoggerService } from './logger/logger.service';
import type { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(MyLoggerService);
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('CRMS API Swagger Doc')
    .setDescription('The CRMS API description')
    .setVersion('1.0')
    .addTag('crms')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
