import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UserDto {
  @JoiSchema(Joi.string().required())
  username: string;

  @JoiSchema(Joi.string().required())
  password: string;

  @JoiSchema(Joi.string().default('USER').valid('USER', 'ADMIN').optional())
  role: string;
}
