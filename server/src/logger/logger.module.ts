import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [MetricsModule],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class MyLoggerModule {}
