import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateMarkDto } from './dto/createMark.dto';
import { UpdateMarkDto } from './dto/updateMark.dto';
import { MarkEntity } from './mark.entity';
import { MarkResponseInterface } from './types/markResponse.interface';

@Injectable()
export class MarkService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MarkEntity)
    private readonly examRepository: Repository<MarkEntity>,
  ) {}

  async createExam(
    currentUserId: number,
    createExamDto: CreateMarkDto,
  ): Promise<MarkResponseInterface> {
    const user = await this.userRepository.findOne(currentUserId, {
      relations: ['marks'],
    });

    if (user.marks.find((element) => createExamDto.exam === element.exam)) {
      throw new HttpException('Экзамен уже загружен', HttpStatus.BAD_REQUEST);
    }

    const exam = new MarkEntity();

    Object.assign(exam, createExamDto);
    await this.examRepository.save(exam);

    user.marks.push(exam);

    await this.userRepository.save(user);

    return { exam };
  }

  async updateExam(
    updateExamDto: UpdateMarkDto,
  ): Promise<MarkResponseInterface> {
    const exam = await this.examRepository.findOne(updateExamDto.id);

    Object.assign(exam, updateExamDto);
    await this.examRepository.save(exam);

    return { exam };
  }
}
