import { Injectable, Logger } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly logCounter: client.Counter<string>;
  private readonly logger = new Logger(PrometheusService.name);

  constructor() {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: 'nestjs-prometheus' });
    client.collectDefaultMetrics({ register: this.register });

    this.logCounter = new client.Counter({
      name: 'app_logs_total',
      help: 'Number of application logs',
      labelNames: ['level'],
      registers: [this.register],
    });
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }

  incrementLogCount(level: string) {
    this.logCounter.inc({ level });
  }
}
