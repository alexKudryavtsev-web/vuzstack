import { Injectable } from '@nestjs/common';
import { launch } from 'puppeteer';

interface VuzItem {
  city: string;
  shortName: string;
  fullName: string;
  detailsURL?: string;
  details: VuzDetails;
  directions: any;
}

interface VuzDetails {
  yearOfFoundation: number;
  withHostel: boolean;
  numberOfStudents: number;
  isState: boolean;
}

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

  async parseVuzAndDirections(): Promise<VuzItem[]> {
    const browser = await launch();
    const page = await browser.newPage();

    const result = [];

    for (let i = 1; i <= 1; i++) {
      if (i === 1) {
        await page.goto('https://vuzoteka.ru/вузы');
      } else {
        await page.goto(`https://vuzoteka.ru/вузы?page=${i}`);
      }

      const newVuzList: VuzItem[] = await page.evaluate(this._evaluatePage);

      for (const vuz of newVuzList) {
        console.log(vuz.fullName);
        await page.goto(vuz.detailsURL);

        vuz.details = await page.evaluate(this._evaluateVuzDetails);
        vuz.directions = await page.evaluate(this._evaluateVuzDirection);
      }

      result.push(...newVuzList);
    }

    await browser.close();

    return result;
  }

  _evaluatePage() {
    const res = [];
    const nodes = document.querySelectorAll(
      '#content > div.institute-rows > div > div:nth-child(1)',
    );

    for (const node of nodes.values()) {
      if (!node.id.includes('rank-')) {
        continue;
      }

      const id = Number(node.id.replace('rank-', ''));

      const cityNode: any = document.querySelector(
        `#rank-${id} > div.labels-wrap.item-features-search.border-r5 > div:nth-child(2) > div.institute-search-value > a`,
      );
      const link: any = document.querySelector(
        `#rank-${id} > div.institute-search-caption > div.institute-search > a`,
      );

      const [shortName, fullName] = link?.innerText.split(' – ');

      if (res.find((vuz) => vuz.fullName == fullName)) {
        continue;
      }

      res.push({
        city: cityNode?.innerText,
        shortName,
        fullName: fullName || shortName,
        detailsURL: `https:${link?.getAttribute('href')}`,
      });
    }

    return res;
  }

  _evaluateVuzDetails() {
    const withHostel = document
      .querySelector(
        '#item-features-view > div.label-part.number-1 > div.institute-view-value > div',
      )
      .className.includes('yes');

    const isState = document
      .querySelector(
        '#item-features-view > div.label-part.number-4.even.last > div.institute-view-value > div',
      )
      .className.includes('yes');

    const numberOfStudents = Number(
      document
        .querySelector(
          '#item-features-view > div.label-part.number-6.even > div.institute-view-value.emphasis',
        )
        .innerHTML.trim()
        .replace(' ', ''),
    );
    const yearOfFoundation = Number(
      document
        .querySelector(
          '#item-features-view > div.label-part.number-5 > div.institute-view-value.emphasis',
        )
        .innerHTML.trim()
        .replace(' ', ''),
    );

    return {
      isState,
      withHostel,
      numberOfStudents,
      yearOfFoundation,
    };
  }

  _evaluateVuzDirection() {
    return [];
  }
}
