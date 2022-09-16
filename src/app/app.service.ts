import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {data: "Hello"};
  }
}
