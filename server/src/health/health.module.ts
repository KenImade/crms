import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule, MetricsModule],
  controllers: [HealthController],
})
export class HealthModule {}
