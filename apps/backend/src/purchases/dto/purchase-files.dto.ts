import { ApiProperty } from "@nestjs/swagger";
import { FileMetadataWithUrlDto } from "../../files/dto/file-metadata-with-url.dto";

export class PurchaseFilesDto {
    @ApiProperty({ type: FileMetadataWithUrlDto })
    redemptionStatement: FileMetadataWithUrlDto;

    @ApiProperty({ type: FileMetadataWithUrlDto })
    attestation: FileMetadataWithUrlDto;
}