import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUp: UserDto) {
    try {
      const user: User = await new this.userModel({
        username: signUp.username,
        password: await bcrypt.hash(signUp.password, await bcrypt.genSalt()),
      }).save();
      return {
        access_token: this.jwtService.sign({ id: user.UUID }),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(login: UserDto) {
    let user: User = await this.userModel.findOne({ username: login.username });
    if ((await bcrypt.compare(login.password, user.password)) === false)
      throw new UnauthorizedException();
    this.userService.usedAt(user.UUID);
    return {
      access_token: this.jwtService.sign({ id: user.UUID }),
    };
  }
}
