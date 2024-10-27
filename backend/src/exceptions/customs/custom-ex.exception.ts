import { HttpException, HttpStatus } from '@nestjs/common';

export class MyException extends HttpException {
  constructor() {
    super('Your message', HttpStatus.BAD_REQUEST);
  }
}
