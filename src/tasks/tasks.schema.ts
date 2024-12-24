import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
