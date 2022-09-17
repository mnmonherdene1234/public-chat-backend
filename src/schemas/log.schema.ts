import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, PromiseProvider } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
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
