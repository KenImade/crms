import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

interface sendMailParamsInterface {
  to: string;
  from: string | undefined;
  subject: string;
  template: string;
  context:
    | {
        [name: string]: any;
      }
    | undefined;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendEmail(params: {
    subject: string;
    template: string;
    context: ISendMailOptions['context'];
    receiverEmail: string;
  }) {
    const senderEmail = this.configService.get<string>('SMTP_FROM');
    const receiverEmail = params.receiverEmail;
    try {
      if (!receiverEmail) {
        throw new Error(
          `No recipient email provided, please provide an email address`,
        );
      }

      const sendMailParams: sendMailParamsInterface = {
        to: receiverEmail,
        from: senderEmail,
        subject: params.subject,
        template: params.template,
        context: params.context,
      };

      const response = await this.mailerService.sendMail(sendMailParams);

      // this.logger.log(
      //   `Email sent successfully with the following parameters: ${JSON.stringify(sendMailParams)}`,
      //   response,
      // );
    } catch (error) {
      // this.logger.error(
      //   `Error while sending mail with the following parameters: ${JSON.stringify(params)}`,
      //   error,
      // );
    }
  }
}
