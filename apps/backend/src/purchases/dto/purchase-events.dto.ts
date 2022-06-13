import { ApiProperty } from "@nestjs/swagger";
import { CertificateEventType } from "@zero-labs/tokenization-api";

export class PurchaseEventDTO {
    @ApiProperty({ example: 1655107807 })
    timestamp: number;
    
    @ApiProperty({ example: '0xac40070dc36e7fc274573326d776f21652e125716e879ca4578cf4a4539365aa' })
    txHash: string;
    
    @ApiProperty({ example: '0x795f32868489b9edbf4daef6eb3cdae215836b7eb786ba8763b66d82ec19709d' })
    blockHash: string;
    
    @ApiProperty({ example: '0x384A377D142F5bF9c5649b3fED322F45E0261A0C' })
    from: string;
    
    @ApiProperty({ example: '0xD173313A51f8fc37BcF67569b463abd89d81844f' })
    to: string;
    
    @ApiProperty({ example: 1e6.toString()})
    recs: string;
    
    @ApiProperty({ enum: CertificateEventType, example: CertificateEventType.TRANSFER })
    type: CertificateEventType;
    
    @ApiProperty({ example: '2020-01-01T00:00:00.000Z' })
    date: Date;
}