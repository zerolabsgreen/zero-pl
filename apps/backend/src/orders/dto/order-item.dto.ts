import { ApiProperty } from "@nestjs/swagger";
import { OrderItem } from ".prisma/client";
import { OrderItemTimeframeDto } from "./order-item-timeframe.dto";
import { CountryEnumType } from "@prisma/client";
import { IsEnum } from "class-validator";

export class OrderItemDto implements OrderItem {
  constructor(partial: Partial<OrderItemDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: "b4419504-1461-4f91-9073-1d39a3961e2d" })
  id: string;

  @ApiProperty({ example: "ca85db1a-fa8d-49fc-a2b9-b6de147bfd74" })
  orderId: string;

  @ApiProperty({ example: CountryEnumType.DE })
  @IsEnum(CountryEnumType)
  country: CountryEnumType;

  @ApiProperty({ example: "Kraków" })
  city: string;

  @ApiProperty({ example: "1234" })
  minerId: string;

  @ApiProperty({ type: [OrderItemTimeframeDto] })
  timeFrames: OrderItemTimeframeDto[];

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  createdAt: Date;

  @ApiProperty( { example: "2021-08-26T18:20:30.633Z" })
  updatedAt: Date;
}
