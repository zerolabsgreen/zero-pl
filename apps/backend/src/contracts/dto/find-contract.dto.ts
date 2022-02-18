import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { CountryEnumType } from '@prisma/client';
import { IsOptional, IsEnum, IsString, IsUUID, Validate } from 'class-validator';
import { PositiveBNStringValidator } from '../../utils/positiveBNStringValidator';
import { ContractDto } from './contract.dto';


export class CountryRegionPair {
  @ApiProperty({ example: 'EU' })
  @IsString()
  region: string;

  @ApiProperty({ example: CountryEnumType.DE })
  @IsEnum(CountryEnumType)
  country: CountryEnumType;
}


export class FindContractDto extends OmitType(ContractDto, [
  'region',
  'countries',
]) {
  @ApiProperty({ example: [{ region: 'EU', country: 'DE' }, { region: 'EU', country: 'FR' }] })
  countryRegionMap: CountryRegionPair[];

  static toDto(entity: ContractDto): FindContractDto {

    const { region, countries, ...stripped } = entity;

    return {
      ...stripped, countryRegionMap: countries.map((id1) => {
        return {
          country: id1,
          region: region
        }
      })
    }
  }

}
