import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FindDto } from 'src/validations/find.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMessageDto: MessageDto, @Req() req: any) {
    return this.messageService.create(createMessageDto, req.user.id);
  }

  @Get()
  findAll(@Query() findDto: FindDto) {
    return this.messageService.findAll(findDto);
  }
}
