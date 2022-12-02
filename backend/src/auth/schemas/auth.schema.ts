import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, trim: true, unique: true })
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
    trim: true,
    validate(value: string) {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (!regex.test(value)) {
        throw new Error('Password is not valid');
      }
    },
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
