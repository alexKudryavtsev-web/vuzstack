import { DirectionEntity } from '@app/api/direction/direction.entity';
import { VuzEntity } from '@app/api/direction/vuz.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParserService } from '@app/parser/parser.service';
import { ExamEnum } from '@app/api/mark/mark.entity';
import { VuzDetailsInterface } from '@app/parser/interface/vuzDetails.interface';
import {
  ArticleEntity,
  ArticleTypeEnum,
} from '@app/api/article/article.entity';

@Injectable()
export class ImporterService {
  constructor(
    @InjectRepository(VuzEntity)
    private readonly vuzRepository: Repository<VuzEntity>,
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly parserService: ParserService,
  ) {}

  async createImport(deep = 10): Promise<void> {
    const data = await this.parserService.parseVuzAndDirections(deep);

    for (const vuz of data) {
      vuz.directions = vuz.directions.map((direction) => ({
        ...direction,
        optionalExams: direction.optionalExams.map(this._convertSubjectName),
        requiredExams: direction.requiredExams.map(this._convertSubjectName),
      }));

      vuz.directions = vuz.directions.filter(
        (direction) =>
          direction.budgetPlaces !== 0 &&
          !direction.requiredExams.includes('ДВИ') &&
          direction.requiredExams.length &&
          direction.optionalExams.length,
      );
      if (!vuz.details || !vuz.details.isState || !vuz.directions.length) {
        continue;
      }

      const article = new ArticleEntity();
      article.content = this._generateArticle(vuz.details);
      article.type = ArticleTypeEnum.VUZ_DESCRIPTION;
      await this.articleRepository.save(article);

      const newVuzEntity = new VuzEntity();

      Object.assign(newVuzEntity, {
        shortName: vuz.shortName,
        fullName: vuz.fullName,
        city: vuz.city,
        numberOfStudents: vuz.details.numberOfStudents,
        withHostel: vuz.details.withHostel,
        yearOfFoundation: vuz.details.yearOfFoundation,
        logoUrl: vuz.details.logoUrl,
      });

      newVuzEntity.article = article;

      await this.vuzRepository.save(newVuzEntity);

      for (const direction of vuz.directions) {
        const newDirection = new DirectionEntity();

        Object.assign(newDirection, {
          code: direction.code,
          name: direction.name,
          department: direction.department,
          profile: direction.profile,
          budgetPlaces: direction.budgetPlaces,
          type: direction.type,
          requiredExams: direction.requiredExams,
          optionalExams: direction.optionalExams,
        });

        newDirection.optionalExams;
        newDirection.vuz = newVuzEntity;

        await this.directionRepository.save(newDirection);
      }
    }
  }

  _generateArticle(details: VuzDetailsInterface): string {
    return `
## ${details.fullName}
${details.shortDescription}
- Адрес: ${details.address}
- Ректор: ${details.rector}
- Сайт: [${details.websiteName}](${details.websiteUrl})`;
  }

  _convertSubjectName(subject: string): string {
    switch (subject) {
      case 'информатика и ИКТ':
        return ExamEnum.COMPUTER_SCIENCE;
      case 'биология':
        return ExamEnum.BIOLOGY;
      case 'химия':
        return ExamEnum.CHEMISTRY;
      case 'иностранный язык':
        return ExamEnum.FOREIGN_LANGUAGE;
      case 'история':
        return ExamEnum.HISTORY;
      case 'математика':
        return ExamEnum.MATH;
      case 'физика':
        return ExamEnum.PHYSIC;
      case 'русский язык':
        return ExamEnum.RUSSIAN_LANGUAGE;
      case 'обществознание':
        return ExamEnum.SOCIAL_SCIENCE;
      case 'география':
        return ExamEnum.GEOGRAPHY;
      default:
        return 'ДВИ';
    }
  }
}
