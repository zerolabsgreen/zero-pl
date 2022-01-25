import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formatPower, Unit } from '../../../../utils';

dayjs.extend(utc);

interface UseOfferSummaryBlockProps {
  price: number;
  quantity: string;
  reservedUntil: string;
}

export const useOfferSummaryBlockEffects = ({
  price,
  quantity,
  reservedUntil,
}: UseOfferSummaryBlockProps) => {
  const volume = formatPower(quantity, { unit: Unit.MWh });
  const priceToPay = price * Math.round(parseInt(volume));
  const displayVolume = `${volume} ${Unit.MWh}`;
  const formattedReservedUntilDate = dayjs(reservedUntil)
    .utc()
    .format('YYYY-MM-DD');

  return {
    displayVolume,
    priceToPay,
    formattedReservedUntilDate,
  };
};
