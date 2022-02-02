import { Unit } from '@energyweb/utils-general';

export type TFormatPowerOptions = {
  includeUnit?: boolean;
  shouldRound?: boolean;
  unit?: string;
  decimalPlaces?: number;
};

export type TDisplayUnit = 'Wh' | 'kWh' | 'MWh' | 'GWh';

export enum DisplayUnit {
  Wh = 'Wh',
  kWh = 'kWh',
  MWh = 'MWh',
  GWh = 'GWh',
}

const getNumberFormatter = (decimalPlaces = 3) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
});

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

  return `${formatter.format(value)}${includeUnit ? ' ' + unit : ''}`;
};
