import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Log {
  @Prop()
  ip: string;

  @Prop()
  id: string;

  @Prop()
  path: string;

  @Prop()
  status: number;

  @Prop({
    type: String,
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
  method: string;

  @Prop({
    type: Number,
  })
  time: number;

  @Prop({
    immutable: true,
    default: now(),
  })
  date: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
