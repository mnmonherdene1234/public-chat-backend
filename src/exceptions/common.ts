import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}

export class MessageNotFoundException extends HttpException {
  constructor() {
    super('MESSAGE_NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}
