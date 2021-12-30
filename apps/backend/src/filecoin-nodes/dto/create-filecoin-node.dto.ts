import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateFilecoinNodeDto {
  @ApiProperty({ example: "f0112027" })
  @IsString()
  id: string;

  @ApiProperty({ example: "29e25d61-103a-4710-b03d-ee12df765066" })
  @IsUUID()
  buyerId: string
}
