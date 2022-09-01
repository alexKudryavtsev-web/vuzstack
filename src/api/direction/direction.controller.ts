import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/createDirection.dto';
import { CreateVuzDto } from './dto/createVuz.dto';
import { SelectDirectionDto } from './dto/selectDirection.dto';
import { UpdatePriorityDto } from './dto/updatePriority.dto';
import { DirectionsResponseInterface } from './interfaces/directionResponse.interface';
import { DirectionsWithMetaResponseInterface } from './interfaces/directionsWithMetaResponse.interface';

@Controller()
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post('admin/vuz')
  @UsePipes(new ValidationPipe())
  async createVuz(@Body() createVuzDto: CreateVuzDto) {
    return await this.directionService.createVuz(createVuzDto);
  }

  @Post('admin/direction')
  @UsePipes(new ValidationPipe())
  async createDirection(@Body() createDirectionDto: CreateDirectionDto) {
    return await this.directionService.createDirection(createDirectionDto);
  }

  @Get('direction')
  @UseGuards(AuthGuard)
  async readDirection(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<DirectionsWithMetaResponseInterface> {
    return await this.directionService.readDirections(currentUserId, query);
  }

  @Post('direction')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async selectDirection(
    @User('id') currentUserId: number,
    @Body() selectDirectionDto: SelectDirectionDto,
  ): Promise<DirectionsResponseInterface> {
    return await this.directionService.selectDirection(
      currentUserId,
      selectDirectionDto.directionId,
    );
  }

  @Delete('direction/:directionId')
  @UseGuards(AuthGuard)
  async deselectDirection(
    @User('id') currentUserId: number,
    @Param('directionId') directionId: number,
  ): Promise<DirectionsResponseInterface> {
    return await this.directionService.deselectDirection(
      currentUserId,
      directionId,
    );
  }

  @Patch('direction')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updatePriority(
    @User('id') currentUserId: number,
    @Body() updatePriority: UpdatePriorityDto,
  ): Promise<DirectionsResponseInterface> {
    return await this.directionService.updatePriority(
      currentUserId,
      updatePriority,
    );
  }
}
