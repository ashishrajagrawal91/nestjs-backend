import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { IUser } from './user.interface';
import { Model } from 'mongoose';
import { DriverService } from '../driver/driver.service';
import {
  distanceWeight,
  ratingWeight,
  noOfRidesWeight,
} from '../../utils/calculate-weight';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly driverService: DriverService,
  ) {}

  async getUnassignedDriverId(createUserDto: CreateUserDto): Promise<string> {
    const unassignedDriver =
      await this.driverService.getUnassignedDriverWithDistance(
        createUserDto.address.coordinates,
      );
    console.log('unassignedDriver ', unassignedDriver);
    const maxWeightDriverForUser = {
      count: 0,
      driver: null,
    };
    unassignedDriver.map((driver) => {
      const total =
        distanceWeight(driver.distance) +
        ratingWeight(createUserDto.avgRating, driver.avgRating) +
        noOfRidesWeight(createUserDto.numberOfRides, driver.numberOfRides);
      if (maxWeightDriverForUser.count < total) {
        maxWeightDriverForUser.count = total;
        maxWeightDriverForUser.driver = driver._id;
      }
    });
    console.log('maxWeightDriverForUser ', maxWeightDriverForUser);
    return maxWeightDriverForUser.driver;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    createUserDto.driver = await this.getUnassignedDriverId(createUserDto);
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return userData;
  }

  async getUser(userId: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findById(userId);
    console.log('existingUser', existingUser);
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }

  async getUnassignedUser(): Promise<UserDocument[]> {
    const userData = await this.userModel.find({ driver: null });
    if (!userData) {
      throw new NotFoundException('No user found which is not assigned!');
    }
    return userData;
  }

  async getAssignedUserAndDriver(): Promise<UserDocument[]> {
    const userData = await this.userModel
      .find({ driver: { $ne: null } })
      .populate('driver');
    if (!userData) {
      throw new NotFoundException('No user found which is not assigned!');
    }
    return userData;
  }
}
