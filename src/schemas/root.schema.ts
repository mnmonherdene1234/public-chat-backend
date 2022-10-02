import { Prop, Schema } from '@nestjs/mongoose';
import { randomUUID as uuid } from 'crypto';
import { now } from 'mongoose';

@Schema()
export class Root {
  id: string;

  @Prop({
    default: now(),
    immutable: true,
  })
  created_at: Date;

  @Prop({
    default: null,
  })
  updated_at: Date;

  @Prop({
    default: 'NESTJS SERVER',
  })
  created_by: string;

  @Prop({
    default: null,
  })
  updated_by: string;
}
