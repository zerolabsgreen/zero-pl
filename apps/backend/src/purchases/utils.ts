import { toDateTimeWithOffset } from "../utils/date";
import { dateTimeToUnix } from "../utils/unix";
import { FullPurchaseDto } from "./dto/full-purchase.dto";

export const getClaimData = (purchase: FullPurchaseDto) => ({
    beneficiary: purchase.beneficiary ?? purchase.buyer.name,
    region: purchase.filecoinNode.region ?? '',
    countryCode: purchase.filecoinNode.country ?? '',
    periodStartDate: dateTimeToUnix(
        toDateTimeWithOffset(
            purchase.reportingStart.toISOString(),
            purchase.reportingStartTimezoneOffset ?? 0
        )
    ).toString(),
    periodEndDate: dateTimeToUnix(
        toDateTimeWithOffset(
            purchase.reportingEnd.toISOString(),
            purchase.reportingEndTimezoneOffset ?? 0
        )
    ).toString(),
    purpose: purchase.purpose ?? `Decarbonizing Filecoin Mining Operation`,
    consumptionEntityID: purchase.filecoinNode.id,
    proofID: purchase.id
});