import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateExamDto } from './dto/createExam.dto';
import { UpdateExamDto } from './dto/updateExam.dto';
import { ExamService } from './exam.service';
import { ExamResponseInterface } from './types/examResponse.interface';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createExam(
    @User('id') currentUserId: number,
    @Body() createExamDto: CreateExamDto,
  ): Promise<ExamResponseInterface> {
    return this.examService.createExam(currentUserId, createExamDto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateExam(
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<ExamResponseInterface> {
    return await this.examService.updateExam(updateExamDto);
  }
}
