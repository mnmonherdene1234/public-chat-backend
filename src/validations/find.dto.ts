import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class FindDto {
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

  @JoiSchema(Joi.any().default("").optional())
  populate: string | string[];
}
