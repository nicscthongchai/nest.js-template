import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ default: ['user'], enum: ['admin', 'user'], type: [String] })
  roles: string[]

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  active: 'active' | 'inactive'

  createdAt: Date
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
