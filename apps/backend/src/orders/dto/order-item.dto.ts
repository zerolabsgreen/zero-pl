import { ApiProperty } from "@nestjs/swagger";
import { OrderItem } from ".prisma/client";
import { OrderItemTimeframeDto } from "./order-item-timeframe.dto";

export class OrderItemDto implements OrderItem {
  constructor(partial: Partial<OrderItemDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: "b4419504-1461-4f91-9073-1d39a3961e2d" })
  id: string;

  @ApiProperty({ example: "ca85db1a-fa8d-49fc-a2b9-b6de147bfd74" })
  orderId: string;

  @ApiProperty({ example: "PL" })
  country: string;

  @ApiProperty({ example: "Kraków" })
  city: string;

  @ApiProperty({ example: "1234" })
  minerId: string;

  @ApiProperty({ type: [OrderItemTimeframeDto] })
  timeFrames: OrderItemTimeframeDto[];
}
