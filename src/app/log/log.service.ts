import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDto } from 'src/app/log/dto/log.dto';
import { Log, LogDocument } from 'src/schemas/log.schema';
import { User } from 'src/schemas/user.schema';
import { FindDto } from 'src/validations/find.dto';
import find from 'src/utils/find';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async create(logDto: LogDto) {
    return await new this.logModel(logDto).save();
  }

  async findAll(readDto: FindDto) {
    return await find(this.logModel, readDto);
  }
}
