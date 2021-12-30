import { ApiProperty } from "@nestjs/swagger";
import { PaymentPreferencesEnumType, ProtocolTypeEnumType, UserTypeEnumType } from '@prisma/client';
import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from "./create-order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
  @ApiProperty({
    isArray: true,
    enum: PaymentPreferencesEnumType,
    enumName: 'PaymentPreferencesEnumType',
    example: [PaymentPreferencesEnumType.WIRE_TRANSFER, PaymentPreferencesEnumType.CRYPTO]
  })
  @IsEnum(PaymentPreferencesEnumType, { each: true })
  paymentPreferences: PaymentPreferencesEnumType[];

  @ApiProperty({ enum: ProtocolTypeEnumType, enumName: 'ProtocolTypeEnumType' })
  @IsNotEmpty()
  @IsEnum(ProtocolTypeEnumType)
  protocolType: ProtocolTypeEnumType;

  @ApiProperty({ example: 'user@domain.com' })
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty({ enum: UserTypeEnumType, enumName: 'UserTypeEnumType' })
  @IsNotEmpty()
  @IsEnum(UserTypeEnumType)
  userType: UserTypeEnumType;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemDto)
  @ValidateNested()
  items: CreateOrderItemDto[];
}
