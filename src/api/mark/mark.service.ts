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
    private readonly markRepository: Repository<MarkEntity>,
  ) {}

  async createMark(
    currentUserId: number,
    createExamDto: CreateMarkDto,
  ): Promise<MarkResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: ['marks'],
    });

    if (user.marks.find((element) => createExamDto.exam === element.exam)) {
      throw new HttpException('Экзамен уже загружен', HttpStatus.BAD_REQUEST);
    }

    const exam = new MarkEntity();

    Object.assign(exam, createExamDto);
    await this.markRepository.save(exam);

    user.marks.push(exam);

    await this.userRepository.save(user);

    return {
      marks: user.marks,
    };
  }

  async updateMark(
    userId: number,
    updateMarkDto: UpdateMarkDto,
  ): Promise<MarkResponseInterface> {
    const mark = await this.markRepository.findOne({
      where: { id: updateMarkDto.id },
    });

    Object.assign(mark, updateMarkDto);
    await this.markRepository.save(mark);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['marks'],
    });

    return { marks: user.marks };
  }
}
