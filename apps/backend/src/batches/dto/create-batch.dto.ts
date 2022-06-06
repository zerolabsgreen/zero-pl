import {PickType } from '@nestjs/swagger';
import { BatchDto } from './batch.dto';

export class CreateBatchDto extends PickType(BatchDto, ['id']) {}
