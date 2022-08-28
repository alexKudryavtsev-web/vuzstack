import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { DirectionEntity } from './direction.entity';
import { VuzEntity } from './vuz.entity';
import { CreateVuzDto } from './dto/createVuz.dto';
import { CreateDirectionDto } from './dto/createDirection.dto';
import { DirectionsResponseInterface } from './interfaces/directionsResponse.interface';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
    @InjectRepository(VuzEntity)
    private readonly vuzRepository: Repository<VuzEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createVuz(createVuzDto: CreateVuzDto) {
    const newVuz = new VuzEntity();

    Object.assign(newVuz, createVuzDto);

    return await this.vuzRepository.save(newVuz);
  }

  async createDirection(createDirectionDto: CreateDirectionDto) {
    const vuz = await this.vuzRepository.findOne(createDirectionDto.vuzId, {
      relations: ['directions'],
    });
    const newDirection = new DirectionEntity();

    delete createDirectionDto.vuzId;

    Object.assign(newDirection, createDirectionDto);

    await this.directionRepository.save(newDirection);

    vuz.directions.push(newDirection);
    await this.vuzRepository.save(vuz);

    return newDirection;
  }

  async readDirections(
    currentUserId: number,
    query: any,
  ): Promise<DirectionsResponseInterface> {
    const { limit = 10, offset = 0, city } = query;

    const user = await this.userRepository.findOne(currentUserId, {
      relations: ['exams'],
    });

    const exams = user.marks.map((exam) => exam.exam);

    const queryBuilder = getRepository(DirectionEntity)
      .createQueryBuilder('directions')
      .leftJoinAndSelect('directions.vuz', 'vuz');

    const total = await queryBuilder.getCount();

    if (city) {
      queryBuilder.andWhere('vuz.city=:city', {
        city,
      });
    }

    // TODO: add filters by exam
    // for (const exam of exams) {
    //   queryBuilder.orWhere('directions.requiredExams LIKE :exam', {
    //     exam: `%${exam}%`,
    //   });
    //   queryBuilder.orWhere('directions.optionalExams LIKE :exam', {
    //     exam: `%${exam}`,
    //   });
    // }

    const filtred = await queryBuilder.getCount();

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);

    const directions = await queryBuilder.getMany();

    return {
      directions,
      meta: {
        total,
        limit,
        offset,
        filtred,
      },
    };
  }
}
