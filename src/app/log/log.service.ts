import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from 'src/schemas/log.schema';
import { FindDto } from './dto/find.dto';
import { LogDto } from './dto/log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async create(logDto: LogDto) {
    return await new this.logModel(logDto).save();
  }

  async findAll(findDto: FindDto) {
    if (findDto.filter) {
      if (findDto.pagination) {
        if (findDto.sort) {
          return await this.logModel
            .find(findDto.filter)
            .skip((findDto.pagination.page - 1) * findDto.pagination.pageSize)
            .limit(findDto.pagination.pageSize)
            .sort(findDto.sort);
        }
        return await this.logModel
          .find(findDto.filter)
          .skip((findDto.pagination.page - 1) * findDto.pagination.pageSize)
          .limit(findDto.pagination.pageSize);
      } else {
        if (findDto.sort) {
          return await this.logModel.find(findDto.filter).sort(findDto.sort);
        }
        return await this.logModel.find(findDto.filter);
      }
    } else {
      if (findDto.pagination) {
        if (findDto.sort) {
          return await this.logModel
            .find()
            .skip((findDto.pagination.page - 1) * findDto.pagination.pageSize)
            .limit(findDto.pagination.pageSize)
            .sort(findDto.sort);
        }
        return await this.logModel
          .find()
          .skip((findDto.pagination.page - 1) * findDto.pagination.pageSize)
          .limit(findDto.pagination.pageSize);
      } else {
        return this.logModel.find().sort(findDto.sort);
      }
    }
    return await this.logModel.find();
  }
}
