import { Controller, Get, Post, Body, Query, UseInterceptors } from '@nestjs/common';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { FindDto } from 'src/validations/find.dto';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@UseInterceptors(LogInterceptor)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: MessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll(@Query() findDto: FindDto) {
    return this.messageService.findAll(findDto);
  }
}
