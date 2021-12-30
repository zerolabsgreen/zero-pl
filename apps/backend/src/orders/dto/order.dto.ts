import { ApiProperty } from "@nestjs/swagger";
import { Order, PaymentPreferencesEnumType, ProtocolTypeEnumType, UserTypeEnumType } from '@prisma/client';
import { OrderItemDto } from "./order-item.dto";
import { Exclude } from 'class-transformer';

export class OrderDto implements Order {
  constructor(partial: Partial<OrderDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 'ca85db1a-fa8d-49fc-a2b9-b6de147bfd74' })
  id: string;

  @ApiProperty({ example: 'user@domain.com' })
  emailAddress: string;

  @ApiProperty({ enum: UserTypeEnumType, enumName: 'UserTypeEnumType' })
  userType: UserTypeEnumType;

  @ApiProperty({ isArray: true, enum: PaymentPreferencesEnumType, enumName: 'PaymentPreferencesEnumType' })
  paymentPreferences: PaymentPreferencesEnumType[];

  @ApiProperty({ enum: ProtocolTypeEnumType, enumName: 'ProtocolTypeEnumType' })
  protocolType: ProtocolTypeEnumType;

  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @Exclude()
  confirmationToken: string;

  @ApiProperty({ example: false })
  confirmed: boolean;

  @ApiProperty({ example: '2021-10-11T07:48:46.799Z' })
  createdAt: Date;
}
