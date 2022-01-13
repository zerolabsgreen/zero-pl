import { FC } from "react";
import { ReactComponent as RegistrationIcon } from '../../assets/svg/user_plus.svg';
import { ReactComponent as TransferIcon } from '../../assets/svg/user_income.svg';
import { ReactComponent as RedemptionIcon } from '../../assets/svg/certificate_locked.svg';

export enum BlockchainEventsEnum {
 OnChainRegistration = 'On Chain Registration',
 TransferOfOwnership = 'Transfer of Ownership',
 CertificateRedemption = 'Certificate Redemption'
}

interface BlockchainEventIconsProps {
  event: string;
}

export const BlockchainEventIcons: FC<BlockchainEventIconsProps> = ({ event }) => {
  switch(event) {
    case BlockchainEventsEnum.OnChainRegistration:
      return <RegistrationIcon />;

    case BlockchainEventsEnum.TransferOfOwnership:
      return <TransferIcon />;

    case BlockchainEventsEnum.CertificateRedemption:
      return <RedemptionIcon />;

    default:
      return <></>
  }
}
