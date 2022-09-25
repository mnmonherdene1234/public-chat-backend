import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { FindDto } from '../../validations/find.dto';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() findDto: FindDto) {
    return this.logService.findAll(findDto);
  }
}
