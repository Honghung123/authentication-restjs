import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { LoginRequest } from './login-request.dto';
import { AuthService } from './auth.service';
import { Login } from './interfaces/login.interface';
import { create } from 'domain';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async handleLogin(@Body() login: Login): Promise<User> {
    const loginDto = await this.authService.handleLogin(login);
    console.log(loginDto);
    return loginDto;
  }

  @Post('/register')
  async handleRegister(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.authService.handleRegister(createUserDto);
  }

  @Get('/login/:id')
  @Header('Content-Type', 'application/json') // Specify the header of the response
  login(@Param('id') id: number, @Query('state') state: string): string {
    if (state && state === 'success')
      return `Login successfully with id: ${id}`;
    else return 'Login failed with state: ' + state + ' because id: ' + id;
  }

  @Get('/logout')
  @Redirect('http://localhost:8080/auth/login', 200)
  logout(@Req() request: Request, @Res() response: Response) {
    console.log('Logout successfully');
  }

  @Get('/demo/1')
  async findAll(): Promise<string> {
    // console.log(this.authService.findAll().length);
    return 'Hello World! ';
  }

  @Get('/demo/2')
  findAllWithStream(): Observable<any[]> {
    return of([]);
  }

  @Post('/request')
  async request(@Body() loginRequest: LoginRequest): Promise<object> {
    return {};
  }
}
