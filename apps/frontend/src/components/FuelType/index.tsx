import { ReactComponent as SolarIcon } from './solar.svg';
import { ReactComponent as GeothermalIcon } from './geothermal.svg';
import { ReactComponent as BiomassIcon } from './biomass.svg';
import { ReactComponent as WindIcon } from './wind.svg';
import { ReactComponent as HydroIcon } from './hydro.svg';
import Box, { BoxProps } from '@mui/material/Box';
import { css } from '@emotion/css';

export interface FuelTypeProps extends BoxProps {
  fuelType: FuelTypeEnum;
  withoutText?: boolean;
  iconColor?: string;
  height?: string;
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

const iconsLibrary = {
  [FuelTypeEnum.SOLAR]: SolarIcon,
  [FuelTypeEnum.WIND]: WindIcon,
  [FuelTypeEnum.HYDRO]: HydroIcon,
  [FuelTypeEnum.MARINE]: HydroIcon,
  [FuelTypeEnum.THERMAL]: GeothermalIcon,
  [FuelTypeEnum.BIOMASS]: BiomassIcon,
  [FuelTypeEnum.BIOGAS]: BiomassIcon
}

export const FuelType = ({ fuelType, withoutText, iconColor, height, ...restProps }: FuelTypeProps) => {
  const IconElement = iconsLibrary[fuelType]
  const styles = iconColor ? css`
    path {
      fill: ${iconColor}
    }
  ` : undefined;

return (
    <Box display={'flex'} alignItems={'center'} {...restProps}>
      {!withoutText && <Box mr={1}>{fuelType}</Box>}
      <IconElement height={height ?? "22px"} className={styles} />
    </Box>
  )
};

export default FuelType;
