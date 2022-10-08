import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailDto } from '@app/email/dto/email.dto';
import * as path from 'path';
import { RegretEmailDto } from './dto/regret.dto';
import { CongratulationsDto } from './dto/congratulations.dto';

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'yandex',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    this.transporter.verify((err, success) => {
      if (success) {
        this.logger.log('Server is ready to take our messages');
      } else {
        this.logger.error(err.message, err.stack);
      }
    });

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          partialsDir: path.join(__dirname, 'templates'),
          defaultLayout: false,
        },
        viewPath: path.join(__dirname, 'templates'),
      }),
    );
  }

  @Process('activation-email')
  async sendActivationMail(job: Job<EmailDto>) {
    const { email, link } = job.data;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome!',
      template: 'activate-user',
      context: {
        url: link,
      },
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    return {};
  }

  @Process('reset-password-email')
  async sendResetPasswordMail(job: Job<EmailDto>) {
    const { email, link } = job.data;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome!',
      template: 'reset-password',
      context: {
        url: link,
      },
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    return {};
  }

  @Process('congratulations-email')
  async sendCongratulations(job: Job<CongratulationsDto>) {
    const { email, vuz, direction } = job.data;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Congratulations!',
      template: 'congratulations',
      context: {
        email,
        vuz,
        direction,
      },
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    return {};
  }

  @Process('regret-email')
  async sendRegret(job: Job<RegretEmailDto>) {
    const { email } = job.data;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Regret',
      template: 'regret',
      context: {
        email,
      },
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    return {};
  }
}
