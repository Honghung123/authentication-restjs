import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    const savedUser = this.usersService.create(createUserDto);
    return savedUser;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/get-email')
  async findOne(@Query('email') email: string): Promise<any> {
    const result = await this.usersService.findByEmail(email);
    if (result) {
      return result;
    } else {
      throw new NotFoundException('Email not found');
    }
  }

  @Get('/get-username')
  async findByUsername(@Query('username') username: string): Promise<any> {
    const result = await this.usersService.findByUsername(username);
    if (result) {
      return result;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Put('update/:username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }

  @Delete('delete/:email')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
