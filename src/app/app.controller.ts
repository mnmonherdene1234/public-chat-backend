import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { v2 as cloudinary } from 'cloudinary';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('upload')
  async upload() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  }
}
