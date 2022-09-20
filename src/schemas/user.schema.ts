import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Root } from './root.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Root {
  @Prop({
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    enum: ['ADMIN', 'USER'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
