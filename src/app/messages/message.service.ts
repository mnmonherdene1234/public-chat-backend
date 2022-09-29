import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotFoundException } from 'src/exceptions/common';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import find from 'src/utils/find';
import { FindDto } from 'src/validations/find.dto';
import { UserService } from '../users/user.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createMessageDto: MessageDto, user_id: string) {
    const sender = this.userModel.findById(user_id);
    if (!sender) throw new UserNotFoundException();
    const receiver = this.userModel.findById(createMessageDto.receiver);
    if (!receiver) throw new UserNotFoundException();

    this.userService.usedAt(user_id);

    return await new this.messageModel(createMessageDto).save();
  }

  async findAll(findDto: FindDto) {
    return await find(this.messageModel, findDto);
  }
}
