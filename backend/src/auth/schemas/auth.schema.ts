import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';

export type AuthDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  login: string;
  @Prop({
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  })
  email: string;
  @Prop({
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  })
  password: string;
}

export const AuthFactory = SchemaFactory.createForClass(User);
