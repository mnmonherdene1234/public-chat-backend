import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindDto } from 'src/validations/find.dto';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMessageDto: MessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll(@Query() findDto: FindDto) {
    return this.messageService.findAll(findDto);
  }
}
