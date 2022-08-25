import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateExamDto } from './dto/createExam.dto';
import { UpdateExamDto } from './dto/updateExam.dto';
import { ExamEntity } from './exam.entity';
import { ExamResponseInterface } from './types/examResponse.interface';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
  ) {}

  async createExam(
    currentUserId: number,
    createExamDto: CreateExamDto,
  ): Promise<ExamResponseInterface> {
    const user = await this.userRepository.findOne(currentUserId, {
      relations: ['exams'],
    });

    if (user.exams.find((element) => createExamDto.exam === element.exam)) {
      throw new HttpException('Экзамен уже загружен', HttpStatus.BAD_REQUEST);
    }

    const exam = new ExamEntity();

    Object.assign(exam, createExamDto);
    await this.examRepository.save(exam);

    user.exams.push(exam);

    await this.userRepository.save(user);

    return { exam };
  }

  async updateExam(
    updateExamDto: UpdateExamDto,
  ): Promise<ExamResponseInterface> {
    const exam = await this.examRepository.findOne(updateExamDto.id);

    Object.assign(exam, updateExamDto);
    await this.examRepository.save(exam);

    return { exam };
  }
}
