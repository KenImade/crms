import { Controller, Get, Logger, Render } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get()
  @Render('index')
  root() {
    this.logger.log('Accessing root page');

    return {
      title: 'Welcome',
      swaggerUrl: '/api-docs',
      githubUrl: 'https://github.com/KenImade/crms',
    };
  }
}
