import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';

@Injectable()
export class AppService {
  getHello(): any {
    return {data: "Hello"};
  }
}
