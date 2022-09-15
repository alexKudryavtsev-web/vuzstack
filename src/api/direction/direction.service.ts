import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { DirectionEntity } from './direction.entity';
import { VuzEntity } from './vuz.entity';
import { CreateVuzDto } from './dto/createVuz.dto';
import { CreateDirectionDto } from './dto/createDirection.dto';
import { DirectionsWithMetaResponseInterface } from './interfaces/directionsWithMetaResponse.interface';
import { UserEntity } from '../user/user.entity';
import { DirectionsResponseInterface } from './interfaces/directionResponse.interface';
import { UpdatePriorityDto } from './dto/updatePriority.dto';

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
  ): Promise<DirectionsWithMetaResponseInterface> {
    const { limit = 10, offset = 0, city } = query;

    // const user = await this.userRepository.findOne(currentUserId, {
    //   relations: ['marks'],
    // });

    // const exams = user.marks.map((exam) => exam.exam);

    const queryBuilder = getRepository(DirectionEntity)
      .createQueryBuilder('directions')
      .leftJoinAndSelect('directions.vuz', 'vuz');

    const total = await queryBuilder.getCount();

    if (city) {
      queryBuilder.andWhere('vuz.city=:city', {
        city,
      });
    }

    // TODO: v1
    // for (const exam of exams) {
    //   queryBuilder.andWhere(
    //     "concat_ws(',', directions.optionalExams, directions.requiredExams) LIKE :exam",
    //     {
    //       exam: `%${exam}%`,
    //     },
    //   );
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

  async selectDirection(
    userId: number,
    directionId: number,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['directions'],
    });

    const direction = await this.directionRepository.findOne(directionId);

    if (user.priority.length > Number(process.env.MAX_AMOUNT_DIRECTION)) {
      throw new HttpException(
        'Выбрано слишком много направлений',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.directions.find((current) => current.id === direction.id)) {
      throw new HttpException(
        'Направление уже выбрано',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.directions.push(direction);
    user.priority.push(String(directionId));

    await this.userRepository.save(user);

    return {
      directions: await this.prepareDirections(user.directions, user.priority),
    };
  }

  async deselectDirection(
    userId: number,
    directionId: number,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['directions'],
    });
    const direction = await this.directionRepository.findOne(directionId);

    const directionIndex = user.directions.findIndex(
      (current) => current.id === direction.id,
    );

    if (directionIndex >= 0) {
      user.directions.splice(directionIndex, 1);

      const indexInPriorities = user.priority.indexOf(String(directionId));
      user.priority.splice(indexInPriorities, 1);

      await this.userRepository.save(user);
      await this.directionRepository.save(direction);
    }

    return {
      directions: await this.prepareDirections(user.directions, user.priority),
    };
  }

  async updatePriority(
    userId: number,
    updatePriority: UpdatePriorityDto,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['directions'],
    });

    const indexInPriorities = user.priority.indexOf(
      String(updatePriority.directionId),
    );

    user.priority = this._moveElementInArray(
      user.priority,
      indexInPriorities,
      updatePriority.priority - 1,
    );

    await this.userRepository.save(user);

    return {
      directions: await this.prepareDirections(user.directions, user.priority),
    };
  }

  _moveElementInArray(array: any[], oldIndex: number, newIndex: number) {
    if (newIndex >= array.length) {
      let k = newIndex - array.length + 1;
      while (k--) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }

  async prepareDirections(
    directions: DirectionEntity[],
    priority: string[],
  ): Promise<DirectionEntity[]> {
    return priority.map((current) =>
      directions.find((direction) => direction.id === Number(current)),
    );
  }
}
