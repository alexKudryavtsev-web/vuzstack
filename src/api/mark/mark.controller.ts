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
import { CreateMarkDto } from './dto/createMark.dto';
import { UpdateMarkDto } from './dto/updateMark.dto';
import { MarkService } from './mark.service';
import { MarkResponseInterface } from './types/markResponse.interface';

@Controller('exam')
export class MarkController {
  constructor(private readonly examService: MarkService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createExam(
    @User('id') currentUserId: number,
    @Body() createExamDto: CreateMarkDto,
  ): Promise<MarkResponseInterface> {
    return this.examService.createExam(currentUserId, createExamDto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateExam(
    @Body() updateExamDto: UpdateMarkDto,
  ): Promise<MarkResponseInterface> {
    return await this.examService.updateExam(updateExamDto);
  }
}
