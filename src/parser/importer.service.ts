import { DirectionEntity } from '@app/api/direction/direction.entity';
import { VuzEntity } from '@app/api/direction/vuz.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParserService } from '@app/parser/parser.service';

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
      if (!vuz.details.isState) {
        continue;
      }

      const newEntity = new VuzEntity();

      Object.assign(newEntity, {
        shortName: vuz.shortName,
        fullName: vuz.fullName,
        city: vuz.city,
        numberOfStudents: vuz.details.numberOfStudents,
        withHostel: vuz.details.withHostel,
        yearOfFoundation: vuz.details.yearOfFoundation,
        logoUrl: 'null',
      });

      await this.vuzRepository.save(newEntity);

      for (const direction of vuz.directions) {
      }
    }

    console.log('FINISH');
  }
}
