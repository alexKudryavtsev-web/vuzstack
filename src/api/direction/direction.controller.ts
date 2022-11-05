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
} from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { DirectionService } from './direction.service';
import { SelectDirectionDto } from './dto/selectDirection.dto';
import { UpdatePriorityDto } from './dto/updatePriority.dto';
import { DirectionsResponseInterface } from './interfaces/directionResponse.interface';
import { VuzListWithMetaResponseInterface } from './interfaces/directionsWithMetaResponse.interface';

@Controller()
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Get('direction')
  async readDirection(
    @Query() query: any,
  ): Promise<VuzListWithMetaResponseInterface> {
    return await this.directionService.readDirections(query);
  }

  @Post('direction')
  @UseGuards(AuthGuard)
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
