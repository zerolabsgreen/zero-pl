import { PurchaseEventDTO, PurchaseEventDTOType } from "@energyweb/zero-protocol-labs-api-client";
import { constants } from "ethers";
import { BlockchainEventsEnum } from "../../components/BlockchainEventIcons";

export type BlockchainEventWithName = PurchaseEventDTO & { name: BlockchainEventsEnum };

export const getEventName = (event: PurchaseEventDTO): BlockchainEventsEnum => {
    switch(event.type) {
      case PurchaseEventDTOType.transfer:
        if (event.from === constants.AddressZero) {
          return BlockchainEventsEnum.OnChainRegistration;
        }
        
        return BlockchainEventsEnum.TransferOfOwnership;
      case PurchaseEventDTOType.claim:
        return BlockchainEventsEnum.CertificateRedemption;
      default:
        return BlockchainEventsEnum.TransferOfOwnership;
    }
}

export const formatBlockchainEvents = (
  events: PurchaseEventDTO[]
): BlockchainEventWithName[] => events.map(event => ({
  ...event,
  name: getEventName(event)
}));