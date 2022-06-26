import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Driver } from '../driver/driver.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class GeoPoint {
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ type: GeoPoint })
  address: GeoPoint;

  @Prop({ required: true })
  numberOfRides: number;

  @Prop({ required: true })
  avgRating: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Driver', default: null })
  driver: Driver;
}

export const UserSchema = SchemaFactory.createForClass(User);
