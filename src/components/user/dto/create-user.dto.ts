import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  Min,
  Max,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDTO {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: [number, number];

  type?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  fullName: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsNumber()
  @IsNotEmpty()
  numberOfRides: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  avgRating: number;

  driver?: string;
}
