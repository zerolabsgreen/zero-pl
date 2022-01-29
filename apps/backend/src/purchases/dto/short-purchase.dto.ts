import { ApiProperty } from '@nestjs/swagger';

export class ShortPurchaseDto {
  @ApiProperty({ example: '4bfce36e-3fcd-4a41-b752-94a5298b8eb6' })
  id: string;

  @ApiProperty({ example: `${process.env.UI_BASE_URL}/partners/filecoin/purchases/4bfce36e-3fcd-4a41-b752-94a5298b8eb6` })
  pageUrl: string;

  @ApiProperty({ example: `${process.env.API_BASE_URL}/api/partners/filecoin/purchases/4bfce36e-3fcd-4a41-b752-94a5298b8eb6` })
  dataUrl: string;

  constructor(partial: Partial<ShortPurchaseDto>) {
    Object.assign(this, partial);
  }
}
