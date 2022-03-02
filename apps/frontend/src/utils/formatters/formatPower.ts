import { Unit } from '@energyweb/utils-general';
import { Unit as DisplayUnit } from '../enums';
import { getNumberFormatter } from './getNumberFormatter';

export type TFormatPowerOptions = {
  includeUnit?: boolean;
  shouldRound?: boolean;
  unit?: string;
  decimalPlaces?: number;
  withoutComma?: boolean
};

export const formatPower = (
  powerInWatt: number | string,
  options?: TFormatPowerOptions
) => {
  const {
    includeUnit,
    shouldRound = true,
    unit = DisplayUnit.kWh,
    decimalPlaces = 3,
  } = options || ({} as TFormatPowerOptions);

  const calculatedValue = isNaN(Number(powerInWatt))
    ? 0
    : Number(powerInWatt) / Unit[unit as keyof typeof Unit];
  const value = shouldRound ? Math.round(calculatedValue) : calculatedValue;

  const formatter = getNumberFormatter(decimalPlaces);

  if (options?.withoutComma) {
    return `${formatter.format(value).replace(',', '')}${includeUnit ? ' ' + unit : ''}`
  }

  return `${formatter.format(value)}${includeUnit ? ' ' + unit : ''}`;
};
