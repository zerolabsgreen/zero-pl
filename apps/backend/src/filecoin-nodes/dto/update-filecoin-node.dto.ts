import { PartialType } from '@nestjs/swagger';
import { CreateFilecoinNodeDto } from './create-filecoin-node.dto';

export class UpdateFilecoinNodeDto extends PartialType(CreateFilecoinNodeDto) {}
