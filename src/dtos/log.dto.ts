import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class LogDto {
  @JoiSchema(Joi.string().optional())
  ip: string;

  @JoiSchema(Joi.string().optional())
  id: string;

  @JoiSchema(Joi.string().optional())
  path: string;

  @JoiSchema(Joi.number().optional())
  status: number;

  @JoiSchema(
    Joi.string().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE').optional(),
  )
  method: string;

  @JoiSchema(Joi.number().optional())
  time: number;
}
