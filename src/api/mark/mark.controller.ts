import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateMarkDto } from './dto/createMark.dto';
import { UpdateMarkDto } from './dto/updateMark.dto';
import { ExamEnum } from './mark.entity';
import { MarkService } from './mark.service';
import { MarkResponseInterface } from './types/markResponse.interface';

@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createMark(
    @User('id') currentUserId: number,
    @Body() createExamDto: CreateMarkDto,
  ): Promise<MarkResponseInterface> {
    return this.markService.createMark(currentUserId, createExamDto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateMark(
    @User('id') userId: number,
    @Body() updateMarkDto: UpdateMarkDto,
  ): Promise<MarkResponseInterface> {
    return await this.markService.updateMark(userId, updateMarkDto);
  }

  @Get()
  async readExamsList(): Promise<ExamEnum[]> {
    return Object.values(ExamEnum);
  }
}
