import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(MyLoggerService);

  app.useLogger(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
