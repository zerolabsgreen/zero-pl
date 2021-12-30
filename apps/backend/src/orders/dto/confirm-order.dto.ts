import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmOrderDto {
  @ApiProperty({ example: '0577fe1d-74f5-4c4b-b429-85929bf9403d' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
