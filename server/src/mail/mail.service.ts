import { Injectable, Logger } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(params: {
    to: string;
    subject: string;
    template: string;
    context?: ISendMailOptions['context'];
  }) {
    const senderEmail = this.configService.get<string>('SMTP_FROM');
    if (!params.to) {
      throw new Error('No recipient email provided.');
    }

    const sendMailParams: ISendMailOptions = {
      to: params.to,
      from: senderEmail,
      subject: params.subject,
      template: params.template,
      context: params.context,
    };

    try {
      const response = await this.mailerService.sendMail(sendMailParams);
      this.logger.log(`Email sent successfully to ${params.to}`);
      return response;
    } catch (error) {
      this.logger.error(`Error sending email to ${params.to}`, error.stack);
      throw error;
    }
  }
}
