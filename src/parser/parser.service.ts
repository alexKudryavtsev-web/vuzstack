import { Injectable } from '@nestjs/common';
import { launch } from 'puppeteer';
import { Vuz } from './interface/vuz.interface';

@Injectable()
export class ParserService {
  async parseVuzAndDirections(deep: number): Promise<Vuz[]> {
    const browser = await launch();
    const page = await browser.newPage();

    const result = [];

    for (let i = 1; i <= deep; i++) {
      if (i === 1) {
        await page.goto('https://vuzoteka.ru/вузы');
      } else {
        await page.goto(`https://vuzoteka.ru/вузы?page=${i}`);
      }

      const newVuzList: Vuz[] = await page.evaluate(this._evaluatePage);

      for (const vuz of newVuzList) {
        await page.goto(vuz.detailsUrl);

        try {
          vuz.details = await page.evaluate(this._evaluateVuzDetails);
        } catch (error) {}

        const directions = [];

        try {
          await page.goto(vuz.detailsUrl);

          let newDirections = await page.evaluate(this._evaluateVuzDirection);
          newDirections = newDirections.map((dir) => ({
            ...dir,
            type: 'очное',
          }));

          directions.push(...newDirections);
        } catch (error) {}

        try {
          await page.goto(`${vuz.detailsUrl}/очно-заочное-обучение`);
          let newDirections = await page.evaluate(this._evaluateVuzDirection);

          newDirections = newDirections.map((dir) => ({
            ...dir,
            type: 'очно-заочное',
          }));

          directions.push(...newDirections);
        } catch (error) {}

        try {
          await page.goto(`${vuz.detailsUrl}/заочное-обучение`);
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

    await browser.close();

    return result;
  }

  _evaluatePage() {
    const res = [];
    const links = document.querySelectorAll(
      'div.institute-search-caption > div.institute-search > a',
    );

    for (const link of links) {
      const node = link.closest('.institute-row');

      const city = node.querySelector(
        `div.labels-wrap.item-features-search.border-r5 > div:nth-child(2) > div.institute-search-value > a`,
      ).innerHTML;

      const [shortName, fullName] = link.innerHTML.split(' – ');

      if (res.find((vuz) => vuz.fullName == fullName)) {
        continue;
      }

      res.push({
        city,
        shortName,
        fullName: fullName || shortName,
        detailsUrl: `https:${link.getAttribute('href')}`,
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
    const logoUrl =
      'https:' +
      document
        .querySelector(
          '#control-panel > div.institute-caption > div.institute-caption-both > div.institute-logo > img',
        )
        .getAttribute('src');

    const shortDescription = document
      .querySelector('#control-panel > div.institute-caption > div.about-short')
      .innerHTML.replace(/<[^>]*>/g, '')
      .trim();

    const address = document.querySelector(
      '#institute-info > div:nth-child(3) > div:nth-child(3) > span:nth-child(1)',
    ).innerHTML;

    const rector = document.querySelector(
      '#institute-info > div:nth-child(2) > div:nth-child(3)',
    ).innerHTML;

    const websiteNode = document.querySelector(
      '#institute-info > div:nth-child(1) > div:nth-child(3) > a',
    );

    const fullName = document.querySelector(
      '#control-panel > div.institute-caption > div.institute-caption-both > div.institute-title-wrapper > h1',
    ).innerHTML;

    return {
      isState,
      withHostel,
      numberOfStudents,
      yearOfFoundation,
      logoUrl,
      shortDescription,
      address,
      rector,
      websiteName: websiteNode.innerHTML,
      websiteUrl: websiteNode.getAttribute('href'),
      fullName,
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
