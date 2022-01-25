import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatPower, Unit } from '../../../../utils';
import { offerMockData } from '../../../../__mock__';

dayjs.extend(utc);

export const useProductSummaryBlockEffects = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const products = offerMockData.products.map((product) => {
    return {
      address: product.address,
      startDate: dayjs(product.generationStart).utc().format('YYYY-MM-DD'),
      endDate: dayjs(product.generationEnd).utc().format('YYYY-MM-DD'),
      volume: formatPower(product.volume, {
        unit: Unit.MWh,
        includeUnit: true,
      }),
    };
  });

  return {
    isMobile,
    expanded,
    handleExpand,
    products,
  };
};
