import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/createDirection.dto';
import { CreateVuzDto } from './dto/createVuz.dto';

@Controller()
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post('vuz')
  @UsePipes(new ValidationPipe())
  async createVuz(@Body() createVuzDto: CreateVuzDto) {
    return await this.directionService.createVuz(createVuzDto);
  }

  @Post('direction')
  @UsePipes(new ValidationPipe())
  async createDirection(@Body() createDirectionDto: CreateDirectionDto) {
    return await this.directionService.createDirection(createDirectionDto);
  }

  @Get('direction')
  async readDirection() {
    return null;
  }
}
