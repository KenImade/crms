import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLoggerService } from './logger/logger.service';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [HealthModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService, MyLoggerService],
  exports: [MyLoggerService],
})
export class AppModule {}
