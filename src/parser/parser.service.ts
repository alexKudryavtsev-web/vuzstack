import { Injectable } from '@nestjs/common';
import { launch } from 'puppeteer';

interface VuzItem {
  city: string;
  shortName: string;
  fullName: string;
  detailsURL?: string;
  details: VuzDetails;
  directions: Direction[];
}

interface VuzDetails {
  yearOfFoundation: number;
  withHostel: boolean;
  numberOfStudents: number;
  isState: boolean;
  logoUrl?: string;
}

interface Direction {
  code: string;
  name: string;
  department: string;
  profile: string;
  requiredExams: string[];
  optionalExams: string[];
  budgetPlaces: number;
  type: string;
}

@Injectable()
export class ParserService {
  async getVuzImageURL(vuzName: string, page: any): Promise<string> {
    await page.goto(
      `https://yandex.ru/images/search?from=tabbar&text=${vuzName} логотип`,
    );

    const link = await page.evaluate(() => {
      return document
        .querySelector('div > a > img')
        ?.getAttribute('src')
        .replace('/', '');
    });

    return `https:/${link}`;
  }

  async parseVuzAndDirections(): Promise<VuzItem[]> {
    const browser = await launch();
    const page = await browser.newPage();

    const result = [];

    for (let i = 1; i <= 40; i++) {
      if (i === 1) {
        await page.goto('https://vuzoteka.ru/вузы');
      } else {
        await page.goto(`https://vuzoteka.ru/вузы?page=${i}`);
      }

      const newVuzList: VuzItem[] = await page.evaluate(this._evaluatePage);

      for (const vuz of newVuzList) {
        await page.goto(vuz.detailsURL);

        try {
          vuz.details = await page.evaluate(this._evaluateVuzDetails);
        } catch (error) {}

        const directions = [];

        try {
          await page.goto(vuz.detailsURL);

          let newDirections = await page.evaluate(this._evaluateVuzDirection);
          newDirections = newDirections.map((dir) => ({
            ...dir,
            type: 'очное',
          }));

          directions.push(...newDirections);
        } catch (error) {}

        try {
          await page.goto(`${vuz.detailsURL}/очно-заочное-обучение`);
          let newDirections = await page.evaluate(this._evaluateVuzDirection);

          newDirections = newDirections.map((dir) => ({
            ...dir,
            type: 'очно-заочное',
          }));

          directions.push(...newDirections);
        } catch (error) {}

        try {
          await page.goto(`${vuz.detailsURL}/заочное-обучение`);
          let newDirections = await page.evaluate(this._evaluateVuzDirection);

          newDirections = newDirections.map((dir) => ({
            ...dir,
            type: 'заочное',
          }));

          directions.push(...newDirections);
        } catch (error) {}

        vuz.directions = directions;
      }

      result.push(...newVuzList);
    }

    for (const vuz of result) {
      await page.goto(
        `https://yandex.ru/images/search?from=tabbar&text=${vuz.shortName} логотип`,
      );

      const link = await page.evaluate(() => {
        return document
          .querySelector('div > a > img')
          ?.getAttribute('src')
          .replace('/', '');
      });

      vuz.details.logoUrl = `https:/${link}`;
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
    const result = [];
    const outerElement = document.querySelector(
      '#specialities > div:nth-child(4)',
    );

    const directionNodes = outerElement.querySelectorAll(
      'div > div.speciality-row-wrap > ul',
    );

    for (const outer of directionNodes) {
      const titleInfoNode = outer.querySelector(
        'li.speciality-caption.speciality-divisions > div',
      );

      const otherInfoNode = outer.querySelector('li.speciality-properties');

      const budgetPlaces = Number(
        otherInfoNode
          .querySelector('div.label-value')
          .innerHTML.split(' ')
          .find((el) => !isNaN(Number(el))),
      );

      let department = '';
      let profile = '';
      const requiredExams = [];
      const optionalExams = [];

      for (let i = 0; i < titleInfoNode.children.length; i++) {
        if (titleInfoNode.children.item(i).innerHTML.includes('отделение')) {
          department = titleInfoNode.children.item(i + 1).innerHTML.trim();
        }
        if (titleInfoNode.children.item(i).innerHTML.includes('профиль')) {
          profile = titleInfoNode.children.item(i + 1).innerHTML.trim();
        }
        if (titleInfoNode.children.item(i).innerHTML.includes('профили')) {
          profile = titleInfoNode.children.item(i + 1).innerHTML.trim();
        }
      }

      const exams = titleInfoNode.getElementsByClassName('subject-item');

      for (const exam of exams) {
        if (exam.innerHTML.includes('span')) {
          const arr = String(exam.innerHTML).split(
            '<span class="inner-a0 color-t7 italic font-size-5">или</span>',
          );

          optionalExams.push(arr[0].trim(), arr.at(-1).trim());
        } else {
          requiredExams.push(exam.innerHTML);
        }
      }

      const code = titleInfoNode
        .querySelector('span:nth-child(1) > a')
        .innerHTML.trim();

      const name = titleInfoNode
        .querySelector('span:nth-child(3)')
        .innerHTML.trim();

      result.push({
        code,
        name,
        department,
        profile,
        requiredExams,
        optionalExams,
        budgetPlaces,
      });
    }

    return result;
  }
}
