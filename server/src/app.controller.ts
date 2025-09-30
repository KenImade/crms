import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return {
      title: 'Welcome',
      swaggerUrl: '/api-docs',
      githubUrl: 'https://github.com/KenImade/crms',
    };
  }
}
