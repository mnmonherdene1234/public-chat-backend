import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('upload')
  upload() {
    return this.appService.getSignature();
  }

  @Delete('delete/:name')
  deleteFile(@Param('name') name: string) {
    return this.appService.deleteFile(name);
  }
}
