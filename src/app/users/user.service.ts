import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { FindDto } from 'src/validations/find.dto';
import find from 'src/utils/find';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async profile(id: string) {
    let user: User = await this.userModel.findById(id);
    if (!user) throw new UnauthorizedException();
    this.usedAt(id);
    return user;
  }

  async changeUsername(id: string, username: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      $set: { username },
    });
    if (!user) throw new UnauthorizedException();
    return await this.userModel.findById(id);
  }

  async changePassword(id: string, password: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      $set: { password: await bcrypt.hash(password, await bcrypt.genSalt()) },
    });
    if (!user) throw new UnauthorizedException();
    return await this.userModel.findById(id);
  }

  async findAll(readDto: FindDto) {
    return await find(this.userModel, readDto);
  }

  async usedAt(id: string) {
    await this.userModel.findByIdAndUpdate(id, { $set: { used_at: now() } });
  }
}
