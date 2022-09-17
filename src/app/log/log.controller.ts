import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { FindDto } from './dto/find.dto';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get()
  findAll(@Query() query: FindDto) {
    return this.logService.findAll(query);
  }
}
