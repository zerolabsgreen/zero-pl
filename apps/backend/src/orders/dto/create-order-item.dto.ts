/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ValidationOptions
} from "class-validator";
import { CreateOrderItemTimeframeDto } from "./create-order-item-timeframe.dto";
import { Type } from "class-transformer";
import { CountryEnumType } from "@prisma/client";

export class CreateOrderItemDto {
  @ApiProperty({ example: CountryEnumType.DE })
  @IsEnum(CountryEnumType)
  country: CountryEnumType;

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
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "TimeframesInSequence",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
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
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "AdjacentTimeframes",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Array<{start: string | number | Date, end: string | number | Date}>): boolean {
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
