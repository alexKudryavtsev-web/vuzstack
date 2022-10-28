import { Injectable } from '@nestjs/common';
import { launch } from 'puppeteer';

@Injectable()
export class ParserService {
  async getVuzImageURL(vuzName: string): Promise<string> {
    const browser = await launch();
    const page = await browser.newPage();
    const query = `${vuzName} логотип`;

    await page.goto(
      `https://yandex.ru/images/search?from=tabbar&text=${query}`,
    );

    const link = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('src').replace('/', '');
    }, 'div > a > img');

    await browser.close();

    return `https:/${link}`;
  }
}
