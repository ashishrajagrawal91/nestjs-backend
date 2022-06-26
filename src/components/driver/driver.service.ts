import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { IDriver } from './driver.interface';
//import { IUser } from '../user/user.interface';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { Driver, DriverDocument } from './driver.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name)
    private readonly driverModel: Model<DriverDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllDrivers(): Promise<DriverDocument[]> {
    const driverData = await this.driverModel.find();
    if (!driverData || driverData.length == 0) {
      throw new NotFoundException('Drivers data not found!');
    }
    return driverData;
  }

  async getUnassignedDriverWithDistance(
    coordinates: [number, number],
  ): Promise<DriverDocument[]> {
    const assignedDriverIds = await this.userModel.find(
      { driver: { $ne: null } },
      { driver: 1, _id: 0 },
    );
    console.log('assignedDriverIds ', assignedDriverIds);
    const driverData = await this.driverModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: coordinates,
          },
          distanceField: `distance`,
          distanceMultiplier: 1 / 1000,
          query: {
            _id: {
              $nin: assignedDriverIds,
            },
          },
        },
      },
    ]);
    if (!driverData || driverData.length == 0) {
      throw new NotFoundException('Drivers data not found!');
    }
    return driverData;
  }

  async getUnassignedDriver(): Promise<DriverDocument[]> {
    const assignedDriverIds = (
      await this.userModel.find(
        { driver: { $ne: null } },
        { driver: 1, _id: 0 },
      )
    ).map((item: any) => {
      return new mongoose.Types.ObjectId(item.driver);
    });
    const driverData = await this.driverModel.find({
      _id: {
        $nin: assignedDriverIds,
      },
    });
    if (!driverData) {
      throw new NotFoundException('No Driver found which is not assigned!');
    }
    return driverData;
  }
}
