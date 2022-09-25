import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import find from 'src/utils/find';
import { FindDto } from 'src/validations/find.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: MessageDto) {
    return await new this.messageModel(createMessageDto).save();
  }

  async findAll(findDto: FindDto) {
    return await find(this.messageModel, findDto);
  }
}
