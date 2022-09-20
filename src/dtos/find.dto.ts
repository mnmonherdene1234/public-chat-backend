import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class ReadDto {
  @JoiSchema(Joi.object().default({}).optional())
  filter: {};

  @JoiSchema(
    Joi.object({
      page: Joi.number().min(1).required(),
      pageSize: Joi.number().min(1).required(),
    })
      .default({ page: 1, pageSize: 25 })
      .optional(),
  )
  pagination: { page: number; pageSize: number };

  @JoiSchema(Joi.string().default('').optional())
  sort: string;

  @JoiSchema(Joi.array().items(Joi.string()).default([]).optional())
  populate: string[];
}
