import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: MyLoggerService) {}

  @Get()
  getHello(): string {
    this.logger.log('Request received', 'AppController')
    return this.appService.getHello();
  }
}
