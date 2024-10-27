import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Login } from './interfaces/login.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { comparePassword } from 'src/utilities/bcrypt.ultility';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async handleLogin(login: Login): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(login.email);
      console.log(login.password + ' ' + user.password);
      if (user && (await comparePassword(login.password, user.password))) {
        return user;
      } else {
        throw new UnauthorizedException('Email or password is not correct');
      }
    } catch (error) {
      throw new UnauthorizedException('Email or password is not correct');
    }
  }

  async handleRegister(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }
}
