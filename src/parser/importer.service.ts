import { DirectionEntity } from '@app/api/direction/direction.entity';
import { VuzEntity } from '@app/api/direction/vuz.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParserService } from '@app/parser/parser.service';
import { ExamEnum } from '@app/api/mark/mark.entity';

@Injectable()
export class ImporterService {
  constructor(
    @InjectRepository(VuzEntity)
    private readonly vuzRepository: Repository<VuzEntity>,
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
    private readonly parserService: ParserService,
  ) {}

  async createImport(): Promise<void> {
    const data = await this.parserService.parseVuzAndDirections();

    for (const vuz of data) {
      if (!vuz.details.isState || !vuz.details || !vuz.directions.length) {
        continue;
      }

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

      await this.vuzRepository.save(newVuzEntity);

      for (const direction of vuz.directions) {
        if (!direction.requiredExams.length || !direction.budgetPlaces) {
          continue;
        }

        const newDirection = new DirectionEntity();
        const requiredExams = direction.requiredExams
          .map(this._convertSubjectName)
          .filter((exam) => exam !== 'ДВИ');

        const optionalExams = direction.optionalExams
          .map(this._convertSubjectName)
          .filter((exam) => exam !== 'ДВИ');

        Object.assign(newDirection, {
          code: direction.code,
          name: direction.name,
          department: direction.department,
          profile: direction.profile,
          budgetPlaces: direction.budgetPlaces,
          type: direction.type,
          requiredExams,
          optionalExams,
        });

        newDirection.optionalExams;
        newDirection.vuz = newVuzEntity;

        await this.directionRepository.save(newDirection);
      }
    }
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
