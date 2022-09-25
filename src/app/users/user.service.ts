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

  async profile(uuid: string) {
    let user: User = await this.userModel
      .findOne({ UUID: uuid })
      .select(['username', 'role']);
    if (!user) throw new UnauthorizedException();
    this.usedAt(uuid);
    return user;
  }

  async changeUsername(uuid: string, username: string) {
    const user = await this.userModel.updateOne(
      { UUID: uuid },
      { $set: { username } },
    );
    if (!user) throw new UnauthorizedException();
    return await this.userModel.findOne({ UUID: uuid }).select('username');
  }

  async changePassword(uuid: string, password: string) {
    const user = await this.userModel.updateOne(
      { UUID: uuid },
      {
        $set: { password: await bcrypt.hash(password, await bcrypt.genSalt()) },
      },
    );
    if (!user) throw new UnauthorizedException();
    return await this.userModel.findOne({ UUID: uuid }).select('username');
  }

  async findAll(readDto: FindDto) {
    return await find(this.userModel, readDto);
  }

  async usedAt(UUID: string) {
    await this.userModel.findOneAndUpdate(
      { UUID },
      { $set: { used_at: now() } },
    );
  }
}
