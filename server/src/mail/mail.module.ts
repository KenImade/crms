import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

const templateDir =
  process.env.NODE_ENV === 'production'
    ? join(__dirname, '../templates/emails') // after build
    : join(__dirname, '../../src/templates/emails');
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: Number(config.get<number>('SMTP_PORT')),
          secure: config.get<boolean>('SMTP_SECURE'),
          tls: {
            rejectUnauthorized: false,
          },
        },
        template: {
          dir: templateDir,
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
