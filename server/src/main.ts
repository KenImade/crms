import * as fs from 'fs';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logLevel = process.env.LOG_LEVEL || 'info';

// ensures log directory is available
const logDir = '/app/logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const loggerInstance = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, '%DATE%-error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),

    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, `%DATE%-combined.log`),
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize({ all: true }),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});

loggerInstance.info('Logging initialized');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({ instance: loggerInstance }),
  });

  const config = new DocumentBuilder()
    .setTitle('CRMS API Swagger Doc')
    .setDescription('The CRMS API description')
    .setVersion('1.0')
    .addTag('crms')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.setBaseViewsDir(path.join(__dirname, 'templates'));
  app.setViewEngine('pug');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
