import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {}

  @Get()
  async sendMail() {
    await this.mailService.sendEmail({
      subject: 'Welcome to the CRMS APP',
      template: 'signup-confirmation-template',
      context: {
        name: 'John Doe',
      },
      receiverEmail: 'test@example.com',
    });
  }
}
