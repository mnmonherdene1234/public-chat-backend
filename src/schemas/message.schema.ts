import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Root } from './root.schema';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

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
export class Message extends Root {
  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
    enum: ['TEXT', 'IMAGE', 'VIDEO', 'FILE'],
  })
  type: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: User.name,
  })
  sender: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: User.name,
  })
  receiver: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
