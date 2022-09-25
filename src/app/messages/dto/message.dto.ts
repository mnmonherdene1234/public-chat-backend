import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class MessageDto {
    @JoiSchema(Joi.string().required())
    message: string;

    @JoiSchema(Joi.string().valid("TEXT", "IMAGE", "VIDEO", "FILE").required())
    type: string;

    @JoiSchema(Joi.string().required())
    sender: string;

    @JoiSchema(Joi.string().required())
    receiver: string;
}