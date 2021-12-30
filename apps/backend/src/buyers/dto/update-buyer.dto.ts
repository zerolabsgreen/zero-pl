import { PartialType } from '@nestjs/swagger';
import { CreateBuyerDto } from './create-buyer.dto';

export class UpdateBuyerDto extends PartialType(CreateBuyerDto) {}
