import { ApiProperty } from "@nestjs/swagger";
import { FileMetadataDto } from "../../files/dto/file-metadata.dto";

export class PurchaseFilesDto {
    @ApiProperty({ type: FileMetadataDto })
    redemptionStatement: FileMetadataDto;

    @ApiProperty({ type: FileMetadataDto })
    attestation: FileMetadataDto;
}