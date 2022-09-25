import { Prop, Schema } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { now } from 'mongoose';

@Schema()
export class Root {
  @Prop({
    default: randomUUID(),
    immutable: true,
  })
  UUID: string;

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
    default: 'SERVER',
  })
  created_by: string;

  @Prop({
    default: null,
  })
  updated_by: string;
}
