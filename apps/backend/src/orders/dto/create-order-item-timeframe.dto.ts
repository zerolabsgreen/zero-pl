import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsISO8601,
  IsNumber,
  Max,
  Min,
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from "class-validator";

export class CreateOrderItemTimeframeDto {
  @ApiProperty({ example: '2020-10-11T00:00:00.000Z' })
  @IsISO8601({ strict: true })
  @IsStartOfDay()
  start: Date;

  @ApiProperty({ example: '2020-12-31T23:59:59.999Z' })
  @IsISO8601({ strict: true })
  @IsEndOfDay()
  @IsGreaterThan("start")
  @IsTheSameYearAs("start")
  end: Date;

  @ApiProperty({ example: 100000, description: 'amount of energy represented in Wh unit' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsInt()
  @Max(9007199254740991)
  @Min(1)
  energy: number;
}

function IsStartOfDay(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsStartOfDay",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, validationArguments?: ValidationArguments): boolean {
          return new Date(value).getUTCMilliseconds() === 0;
        },
        defaultMessage(): string {
          return "start should be the first millisecond of a day";
        }
      }
    });
  };
}

function IsEndOfDay(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsEndOfDay",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, validationArguments?: ValidationArguments): boolean {
          return new Date(value).getUTCMilliseconds() === 999;
        },
        defaultMessage(): string {
          return "end should be the last millisecond of a day";
        }
      }
    });
  };
}

function IsGreaterThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsGreaterThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = args.object[relatedPropertyName];
          return value > relatedValue;
        },
        defaultMessage(args?: ValidationArguments): string {
          return `${args.property} should be larger than ${args.constraints[0]}`;
        }
      }
    });
  };
}

function IsTheSameYearAs(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsTheSameYearAs",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = args.object[relatedPropertyName];
          return new Date(value).getUTCFullYear() === new Date(relatedValue).getUTCFullYear();
        },
        defaultMessage(args?: ValidationArguments): string {
          return `${args.property} should be the same year as ${args.constraints[0]}`;
        }
      }
    });
  };
}
