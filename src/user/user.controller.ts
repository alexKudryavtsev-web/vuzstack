import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('/activate/:activationLink')
  @Redirect(process.env.CLIENT_URL, 301)
  async activateUser(@Param('activationLink') activationLink: string) {
    await this.userService.activateUser(activationLink);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async update(
    @User('id') currentUserId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      updateUserDto,
      currentUserId,
    );

    return this.userService.buildUserResponse(user);
  }

  @Post('/reset-password')
  async resetPassword(@User('id') currentUserId: number): Promise<void> {
    await this.userService.resetPassword(currentUserId);
  }

  @Patch('/update-password/:token')
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Param('token') token: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updatePassword(
      updatePasswordDto,
      token,
    );

    return this.userService.buildUserResponse(user);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(@User('id') currentUserId: number): Promise<void> {
    await this.userService.deleteUser(currentUserId);
  }
}
