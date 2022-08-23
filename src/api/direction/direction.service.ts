import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionEntity } from './direction.entity';
import { VuzEntity } from './vuz.entity';
import { CreateVuzDto } from './dto/createVuz.dto';
import { CreateDirectionDto } from './dto/createDirection.dto';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
    @InjectRepository(VuzEntity)
    private readonly vuzRepository: Repository<VuzEntity>,
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
}
