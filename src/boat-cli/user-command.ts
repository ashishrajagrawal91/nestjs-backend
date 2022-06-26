import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { UserService } from '../components/user/user.service';
import { DriverService } from '../components/driver/driver.service';

@Command({ name: 'userCommand', options: { isDefault: true } })
export class UserCommand implements CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}

  printResult(users, entity) {
    const printObj = [];
    users.map((user) => {
      const temp: { [k: string]: any } = {
        id: user._id,
        fullName: user.fullName,
        address: user.address.coordinates,
        numberOfRides: user.numberOfRides,
        avgRating: user.avgRating,
      };
      if (entity === `user`) {
        if (user.driver && typeof user.driver.fullName === `string`) {
          temp.driverName = user.driver.fullName;
          temp.driverAddress = user.driver.address.coordinates;
          temp.driverNumberOfRides = user.driver.numberOfRides;
          temp.driverAvgRating = user.driver.avgRating;
        }
        printObj.push(temp);
      } else {
        printObj.push(temp);
      }
    });
    console.table(printObj);
  }

  async run(
    inputs: string[],
    options: { commandName?: string },
  ): Promise<void> {
    options = await this.inquirerService.ask('userInput', options);
    if (options.commandName === `customer`) {
      try {
        const users = await this.userService.getAllUsers();
        this.printResult(users, 'user');
      } catch (err) {
        console.log(err.response);
      }
      await this.run([], {});
    } else if (options.commandName === `driver`) {
      try {
        const drivers = await this.driverService.getAllDrivers();
        this.printResult(drivers, 'driver');
      } catch (err) {
        console.log(err.response.message);
      }
      await this.run([], {});
    } else if (options.commandName === `match`) {
      const assignedYsersAndDrivers =
        await this.userService.getAssignedUserAndDriver();
      if (assignedYsersAndDrivers.length) {
        console.log('List of customer and assigned Driver ');
        this.printResult(assignedYsersAndDrivers, 'user');
      }
      const unassigneUsers = await this.userService.getUnassignedUser();
      if (unassigneUsers.length) {
        console.log('List of failed fulfilment customers ');
        this.printResult(unassigneUsers, 'user');
      }
      const unassigneDrivers = await this.driverService.getUnassignedDriver();
      if (unassigneDrivers.length) {
        console.log('List of idle drivers ');
        this.printResult(unassigneDrivers, 'driver');
      }
      await this.run([], {});
    } else if (options.commandName === `manual`) {
      console.log(`Below are the supported commands`);
      console.table([`customer`, `cruiser`, `match`, `manual`]);
      await this.run([], {});
    } else if (options.commandName === `exit`) {
      console.log(`Thank You!`);
    } else {
      await this.run([], {});
    }
  }
}
