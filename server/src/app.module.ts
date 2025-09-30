import { MiddlewareConsumer, Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HealthModule,
    MetricsModule,
    MailModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [Logger, DatabaseService],
  exports: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
