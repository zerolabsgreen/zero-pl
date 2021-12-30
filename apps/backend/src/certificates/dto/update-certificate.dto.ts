import { OmitType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateCertificateDto } from './create-certificate.dto';

export class UpdateCertificateDto extends PartialType(OmitType(CreateCertificateDto, ['energy'])) {
  @Exclude()
  energy: string;
}
