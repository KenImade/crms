import { Controller, Get, Logger, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly mailService: MailService) {}

  @Get('send')
  async sendMail(@Query('email') email: string, @Query('name') name: string) {
    const recipient = email || 'test@example.com';
    const recipientName = name || 'John Doe';

    try {
      this.logger.log(`Attempting to send email to ${recipient}`);
      await this.mailService.sendEmail({
        to: recipient,
        subject: 'Welcome to the CRMS APP',
        template: 'signup-confirmation-template',
        context: { name: recipientName },
      });
      this.logger.log(`Email sent successfully to ${recipient}`);
      return { message: 'Email sent successfully', to: recipient };
    } catch (err) {
      this.logger.error(`Failed to send email to ${recipient}`, err.stack);
      throw err;
    }
  }
}
