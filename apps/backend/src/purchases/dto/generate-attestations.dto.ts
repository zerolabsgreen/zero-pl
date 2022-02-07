import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsUUID } from 'class-validator';
import { IsStringArrayDistinct } from '../../validators/ArrayDistinct';

export class GenerateAttestationsDto {
    @ApiProperty({ type: [String], example: ['4bfce36e-3fcd-4a41-b752-94a5298b8eb6'] })
    @ArrayMinSize(1)
    @IsStringArrayDistinct()
    @IsUUID('all', { each: true })
    purchaseIds: string[];

    constructor(partial: Partial<GenerateAttestationsDto>) {
      Object.assign(this, partial);
    }
}
