import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FindDto } from 'src/validations/find.dto';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('messages')
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
