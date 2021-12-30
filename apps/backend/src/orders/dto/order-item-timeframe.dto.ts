import { ApiProperty } from "@nestjs/swagger";
import { OrderItemTimeFrame } from ".prisma/client";
import { Transform } from "class-transformer";

export class OrderItemTimeframeDto implements OrderItemTimeFrame {
  constructor(partial: Partial<OrderItemTimeframeDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 'a919bac2-67f9-4a03-87ed-2f2aa7fc4920' })
  id: string;

  @ApiProperty({ example: 'b4419504-1461-4f91-9073-1d39a3961e2d' })
  orderItemId: string;

  @ApiProperty({ example: '2020-10-11T00:00:00.000Z' })
  start: Date;

  @ApiProperty({ example: '2020-12-31T23:59:59.999Z' })
  end: Date;

  @ApiProperty({ type: 'number', example: 100000 })
  @Transform(({ value }) => Number(value)) // CreateOrderItemTimeframeDto.energy is a number, so no risk of loosing data here
  energy: bigint;
}
