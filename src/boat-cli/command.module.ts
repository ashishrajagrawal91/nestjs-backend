import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../components/user/user.service';
import { User, UserSchema } from '../components/user/user.schema';
import { DriverService } from '../components/driver/driver.service';
import { Driver, DriverSchema } from '../components/driver/driver.schema';
import { UserCommand } from './user-command';
import { UserInput } from './user-input';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  providers: [UserCommand, UserInput, UserService, DriverService],
})
export class CommandModule {}
