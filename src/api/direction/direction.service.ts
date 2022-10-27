import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionEntity } from './direction.entity';
import { VuzEntity } from './vuz.entity';
import { CreateVuzDto } from './dto/createVuz.dto';
import { CreateDirectionDto } from './dto/createDirection.dto';
import { VuzListWithMetaResponseInterface } from './interfaces/directionsWithMetaResponse.interface';
import { UserEntity } from '../user/user.entity';
import { DirectionsResponseInterface } from './interfaces/directionResponse.interface';
import { UpdatePriorityDto } from './dto/updatePriority.dto';
import { ArticleEntity } from '../article/article.entity';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
    @InjectRepository(VuzEntity)
    private readonly vuzRepository: Repository<VuzEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createVuz(createVuzDto: CreateVuzDto) {
    const article = new ArticleEntity();

    article.content = createVuzDto.article;
    delete createVuzDto.article;

    await this.articleRepository.save(article);

    const newVuz = new VuzEntity();

    newVuz.article = article;

    Object.assign(newVuz, createVuzDto);

    await this.vuzRepository.save(newVuz);

    return newVuz;
  }

  async createDirection(createDirectionDto: CreateDirectionDto) {
    const article = new ArticleEntity();

    article.content = createDirectionDto.article;

    await this.articleRepository.save(article);

    const vuz = await this.vuzRepository.findOne({
      where: { id: createDirectionDto.vuzId },
      relations: ['directions'],
    });
    const newDirection = new DirectionEntity();
    newDirection.article = article;

    delete createDirectionDto.article;
    delete createDirectionDto.vuzId;

    Object.assign(newDirection, createDirectionDto);

    await this.directionRepository.save(newDirection);

    vuz.directions.push(newDirection);
    await this.vuzRepository.save(vuz);

    return newDirection;
  }

  async readDirections(query: any): Promise<VuzListWithMetaResponseInterface> {
    const text = query.text;

    const queryBuilder = this.vuzRepository
      .createQueryBuilder('vuz')
      .leftJoinAndSelect('vuz.directions', 'directions')
      .leftJoinAndSelect('directions.article', 'directionArticle')
      .leftJoinAndSelect('vuz.article', 'article');

    const total = await queryBuilder.getCount();

    if (text) {
      queryBuilder.andWhere("concat_ws(' ', vuz.city, vuz.name) LIKE :text", {
        text: `%${text}%`,
      });
    }

    const filtred = await queryBuilder.getCount();

    queryBuilder.orderBy('vuz.name', 'DESC');

    const vuzList = await queryBuilder.getMany();

    return {
      vuzList,
      meta: {
        total,
        filtred,
      },
    };
  }

  async selectDirection(
    userId: number,
    directionId: number,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['directions', 'marks', 'directions.vuz'],
    });

    const direction = await this.directionRepository.findOne({
      where: { id: directionId },
      select: ['vuz'],
    });

    if (user.priority.length >= Number(process.env.MAX_AMOUNT_DIRECTION)) {
      throw new HttpException(
        'Выбрано слишком много направлений',
        HttpStatus.BAD_REQUEST,
      );
    }

    let requiredExamsPassed = true;

    for (const exam of direction.requiredExams) {
      if (!user.marks.find((mark) => mark.exam === exam)) {
        requiredExamsPassed = false;
      }
    }

    let optionalExamPassed = false;

    for (const exam of direction.optionalExams) {
      if (user.marks.find((mark) => mark.exam === exam)) {
        optionalExamPassed = true;
      }
    }

    if (!requiredExamsPassed || !optionalExamPassed) {
      throw new HttpException(
        'Подходящие предметы не сданы (или результаты не загружены)',
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

    return await this.readSelectedDirections(userId);
  }

  async deselectDirection(
    userId: number,
    directionId: number,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['directions', 'directions.vuz'],
    });
    const direction = await this.directionRepository.findOne({
      where: {
        id: directionId,
      },
    });

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

    return await this.readSelectedDirections(userId);
  }

  async updatePriority(
    userId: number,
    updatePriority: UpdatePriorityDto,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['directions', 'directions.vuz'],
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

    return await this.readSelectedDirections(userId);
  }

  async readSelectedDirections(
    userId: number,
  ): Promise<DirectionsResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['directions', 'directions.vuz'],
    });

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
