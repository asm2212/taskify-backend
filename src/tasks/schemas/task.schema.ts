import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({
    type: String,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
