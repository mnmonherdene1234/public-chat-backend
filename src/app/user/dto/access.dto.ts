import { JoiSchema } from 'nestjs-joi';
//@ts-ignore
import * as Joi from 'joi';

export class AccessDto {
  @JoiSchema(Joi.string().required())
  username: string;

  @JoiSchema(Joi.string().required())
  password: string;
}
