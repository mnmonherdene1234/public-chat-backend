import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDto } from 'src/dtos/log.dto';
import { Log, LogDocument } from 'src/schemas/log.schema';
import { User } from 'src/schemas/user.schema';
import { ReadDto } from 'src/uti../../dtos/find.dto';
import read from 'src/utils/read';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async create(logDto: LogDto) {
    return await new this.logModel(logDto).save();
  }

  async findAll(readDto: ReadDto) {
    return await read(this.logModel, readDto);
  }
}
