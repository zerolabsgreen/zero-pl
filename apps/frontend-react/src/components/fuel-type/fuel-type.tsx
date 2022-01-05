import { Box } from '@mui/material';
import { ReactComponent as Solar } from './solar.svg';
import { ReactComponent as Geothermal } from './geothermal.svg';
import { ReactComponent as Biomass } from './biomass.svg';
import { ReactComponent as Wind } from './wind.svg';
import { ReactComponent as Hydro } from './hydro.svg';
import { FC, ReactElement } from 'react';

/* eslint-disable-next-line */
export interface FuelTypeProps {
  fuelType: FuelTypeEnum;
}

export enum FuelTypeEnum {
  Wind = 'Wind',
  Solar = 'Solar',
  Hydro = 'Hydro',
  Geothermal = 'Geothermal',
  Biomass = 'Biomass',
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
    case FuelTypeEnum.Hydro:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.Hydro}
          iconElement={<Hydro height={'22px'} />}
        />
      );

    case FuelTypeEnum.Solar:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.Solar}
          iconElement={<Solar height={'22px'} />}
        />
      );
    case FuelTypeEnum.Wind:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.Wind}
          iconElement={<Wind height={'22px'} />}
        />
      );
    case FuelTypeEnum.Geothermal:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.Geothermal}
          iconElement={<Geothermal height={'22px'} />}
        />
      );
    case FuelTypeEnum.Biomass:
      return (
        <TextWithIconPartial
          fuelType={FuelTypeEnum.Biomass}
          iconElement={<Biomass height={'22px'} />}
        />
      );
  }
};

export default FuelType;
