import { ReactComponent as Solar } from './solar.svg';
import { ReactComponent as Geothermal } from './geothermal.svg';
import { ReactComponent as Biomass } from './biomass.svg';
import { ReactComponent as Wind } from './wind.svg';
import { ReactComponent as Hydro } from './hydro.svg';
import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';

export interface FuelTypeProps {
  fuelType: FuelTypeEnum;
}

export enum FuelTypeEnum {
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  HYDRO = 'HYDRO',
  MARINE = 'MARINE',
  THERMAL = 'THERMAL',
  BIOMASS = 'BIOMASS',
  BIOGAS = 'BIOGAS',
}

const TextWithIconPartial: FC<{
  fuelType: FuelTypeEnum;
  iconElement: ReactElement;
}> = ({ fuelType, iconElement }) => (
  <Box display={'flex'} alignItems={'center'}>
    <Box mr={1}>{fuelType}</Box> {iconElement}
  </Box>
);

export const FuelType = ({ fuelType }: FuelTypeProps) => {
  switch (fuelType) {
    case FuelTypeEnum.HYDRO:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.HYDRO}
          iconElement={<Hydro height={'22px'} />}
        />
      );

    case FuelTypeEnum.SOLAR:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.SOLAR}
          iconElement={<Solar height={'22px'} />}
        />
      );
    case FuelTypeEnum.WIND:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.WIND}
          iconElement={<Wind height={'22px'} />}
        />
      );
    case FuelTypeEnum.THERMAL:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.THERMAL}
          iconElement={<Geothermal height={'22px'} />}
        />
      );
    case FuelTypeEnum.BIOMASS:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.BIOMASS}
          iconElement={<Biomass height={'22px'} />}
        />
      );
    default:
      return <></>
  }
};

export default FuelType;
