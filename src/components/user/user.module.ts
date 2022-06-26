import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { DriverService } from '../driver/driver.service';
import { Driver, DriverSchema } from '../driver/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, DriverService],
})
export class UserModule {}
