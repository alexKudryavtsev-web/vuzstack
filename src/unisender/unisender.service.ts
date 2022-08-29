import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class UnisenderSerivce {
  async activationEmail() {}

  async resetPasswordEmail() {}

  async congratulatoryEmail() {}

  private async request(method: string) {
    await fetch(
      `https://api.unisender.com/LANG/api/${method}?format=json&${process.env.UNISENDER_KEY}`,
    );
  }
}
