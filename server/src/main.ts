import * as fs from 'fs';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
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
    // new transports.DailyRotateFile({
    //   filename: path.join(logDir, '%DATE%-error.log'),
    //   level: 'error',
    //   format: format.combine(format.timestamp(), format.json()),
    //   datePattern: 'YYYY-MM-DD',
    //   zippedArchive: false,
    //   maxFiles: '30d',
    // }),

    // new transports.DailyRotateFile({
    //   filename: path.join(logDir, `%DATE%-combined.log`),
    //   level: logLevel,
    //   format: format.combine(format.timestamp(), format.json()),
    //   datePattern: 'YYYY-MM-DD',
    //   zippedArchive: false,
    //   maxFiles: '30d',
    // }),

    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      options: { flags: 'a' },
    }),

    new winston.transports.File({
      filename: path.join(logDir, `combined.log`),
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
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
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: loggerInstance }),
  });

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
