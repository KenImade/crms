import { Module } from '@nestjs/common';
import { PrometheusService } from './metrics.service';
import { PrometheusController } from './metrics.controller';

@Module({
  providers: [PrometheusService],
  controllers: [PrometheusController],
  exports: [PrometheusService],
})
export class MetricsModule {}
