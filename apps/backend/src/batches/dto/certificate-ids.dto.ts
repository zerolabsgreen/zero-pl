import { ApiProperty } from "@nestjs/swagger";
import { CertificateIds } from "../../issuer/issuer.service";

export class CertificateIdsDTO implements CertificateIds {
    @ApiProperty()
    onchainId: string;

    @ApiProperty()
    certificateId: string;
}