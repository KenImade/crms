import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { MyLoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private readonly logger: MyLoggerService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    try {
      const result = await this.health.check([
        () => this.prismaHealth.pingCheck('prisma', this.prisma),
      ]);

      this.logger.log('Health check passed', HealthController.name);
      return result;
    } catch (err) {
      this.logger.error(
        'Health check failed',
        err.stack,
        HealthController.name,
      );
      throw err;
    }
  }
}
