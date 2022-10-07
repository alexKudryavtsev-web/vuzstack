import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Post('/activate/:activationLink')
  async activateUser(@Param('activationLink') activationLink: string) {
    await this.userService.activateUser(activationLink);
  }

  @Post('/reset-password')
  async resetPassword(@User('id') currentUserId: number): Promise<void> {
    await this.userService.resetPassword(currentUserId);
  }

  @Patch('/update-password/:token')
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
}
