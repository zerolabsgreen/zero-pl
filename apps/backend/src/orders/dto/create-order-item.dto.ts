import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  registerDecorator,
  ValidateNested,
  ValidationArguments,
  ValidationOptions
} from "class-validator";
import { Countries } from "@energyweb/utils-general";
import { CreateOrderItemTimeframeDto } from "./create-order-item-timeframe.dto";
import { Type } from "class-transformer";

export class CreateOrderItemDto {
  @ApiProperty({ example: "PL" })
  @IsEnum(Countries.map(i => i.code))
  country: string;

  @ApiPropertyOptional({ example: "Kraków" })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ example: "1234" })
  @IsString()
  @IsNotEmpty()
  minerId: string;

  @ApiProperty({ type: [CreateOrderItemTimeframeDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemTimeframeDto)
  @ValidateNested()
  @TimeframesInSequence({ message: "timeFrames items start values need to be sorted chronologically" })
  @AdjacentTimeframes({ message: "timeFrame items should be adjacent" })
  timeFrames: CreateOrderItemTimeframeDto[];
}

function TimeframesInSequence(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "TimeframesInSequence",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value.length < 2) {
            return true;
          }

          for (let i = 0; i < value.length - 1; i++) {
            if (value[i].start >= value[i + 1].start) {
              return false;
            }
          }

          return true;
        }
      }
    });
  };
}

function AdjacentTimeframes(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "AdjacentTimeframes",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, validationArguments?: ValidationArguments): boolean {
          if (value.length < 2) {
            return true;
          }

          for (let i = 0; i < value.length - 1; i++) {
            const nextStartDate = new Date(value[i + 1].start);
            const endDate = new Date(value[i].end);

            if (Math.abs(nextStartDate.getTime() - endDate.getTime()) !== 1) {
              return false;
            }
          }

          return true;
        }
      }
    });
  };
}
