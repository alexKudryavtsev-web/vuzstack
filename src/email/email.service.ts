import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendActivationMail(email: string, link: string) {
    await this.emailQueue.add('activation-email', {
      email: email,
      link: `${process.env.CLIENT_URL}/activate-user/${link}`,
    });
  }

  async sendResetPasswordMail(email: string, token: string) {
    await this.emailQueue.add('reset-password-email', {
      email: email,
      link: `${process.env.CLIENT_URL}/update-password/${token}`,
    });
  }

  async sendCongratulations(email: string, vuz: string, direction: string) {
    await this.emailQueue.add('congratulations-email', {
      email,
      vuz,
      direction,
    });
  }

  async sendRegret(email: string) {
    await this.emailQueue.add('regret-email', {
      email,
    });
  }
}
