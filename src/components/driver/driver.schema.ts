import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Expose } from 'class-transformer';

export type DriverDocument = Driver & Document;

@Schema()
export class GeoPoint {
  @Prop({ required: true, index: '2dsphere' })
  coordinates: [number, number];
}

@Schema()
export class Driver {
  @Prop({ required: true })
  fullName: string;

  @Prop({ type: GeoPoint })
  address: GeoPoint;

  @Prop({ required: true })
  numberOfRides: number;

  @Prop({ required: true })
  avgRating: number;

  @Expose()
  distance?: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
