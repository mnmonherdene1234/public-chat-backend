import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class FindDto {
  @JoiSchema(Joi.object().optional())
  filter: {};

  @JoiSchema(Joi.object({
    page: Joi.number().min(1).required(),
    pageSize: Joi.number().min(1).required()
  }).optional())
  pagination: { page: number; pageSize: number };

  @JoiSchema(Joi.string().optional())
  sort: string
}
