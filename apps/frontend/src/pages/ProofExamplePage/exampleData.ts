import { FullPurchaseDto } from '@energyweb/zero-protocol-labs-api-client';

export const exampleData = {
    "id": "5253751e-9072-4c05-a3ae-e42428baa429",
    "createdOn": "2022-01-24T15:16:08.540Z",
    "txHash": "0x8a65e2f074e08dbf23de0e757a63b5aab53fe38109084d1be7e15943263a90d0",
    "certificateId": "55a057a4-8955-4d5b-96df-3ac0d56aa197",
    "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
    "sellerId": "8c0a45ce-1594-4107-baf0-ce8846b34afd",
    "reportingStart": "2021-01-01T00:00:00.000Z",
    "reportingStartTimezoneOffset": -360,
    "reportingEnd": "2021-12-31T23:59:59.999Z",
    "reportingEndTimezoneOffset": -360,
    "beneficiary": "Buyer 2",
    "redemptionDate": "2022-01-24T15:16:08.564Z",
    "recsSoldWh": "108000000",
    "purpose": "",
    "seller": {
        "id": "8c0a45ce-1594-4107-baf0-ce8846b34afd",
        "name": "3Degrees Group, Inc",
        "addressLine1": "235 Montgomery St Suite 320 CA94104 San Francisco US",
        "addressLine2": "",
        "contactPerson": "-",
        "blockchainAddress": undefined
    },
    "buyer": {
        "id": "53fb6148-eb21-42de-91d6-f6195d028520",
        "name": "Buyer 2",
        "blockchainAddress": "0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9",
        "filecoinNodes": [
            {
                "id": "f066596",
                "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
                "blockchainAddress": undefined
            },
            {
                "id": "f0763337",
                "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
                "blockchainAddress": undefined
            },
            {
                "id": "f01051828",
                "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
                "blockchainAddress": undefined
            },
            {
                "id": "f0678914",
                "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
                "blockchainAddress": undefined
            },
            {
                "id": "f0828066",
                "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
                "blockchainAddress": undefined
            }
        ]
    },
    "filecoinNode": {
        "id": "f0763337",
        "buyerId": "53fb6148-eb21-42de-91d6-f6195d028520",
        "blockchainAddress": undefined
    },
    "certificate": {
        "id": "w55a057a4-8955-4d5b-96df-3ac0d56aa197",
        "energyWh": "108000000",
        "generatorName": "Valentine Wind, LLC (NE)",
        "generatorId": "did:zl:DG000000000003",
        "region": "NE",
        "country": "US",
        "productType": "REC",
        "energySource": "WIND",
        "generationStart": "2021-01-01T00:00:00.000Z",
        "generationStartTimezoneOffset": -360,
        "generationEnd": "2021-03-31T00:00:00.000Z",
        "generationEndTimezoneOffset": -360,
        "txHash": "0x8a65e2f074e08dbf23de0e757a63b5aab53fe38109084d1be7e15943263a90d0",
        "initialSellerId": "8c0a45ce-1594-4107-baf0-ce8846b34afd",
        "capacity": 1850000,
        "commissioningDate": "2014-09-01T00:00:00.000Z",
        "label": undefined
    },
    "redemptionStatement": "https://ipfs.io/ipfs/bafkreigxldrh3lo2spyg424ga4r7srss4f4umm3v7njljod7qvyjtvlg7e",
    "attestation": {
        "id": "d52cf9e9-8a50-48e9-83e3-6753c14178d5",
        "fileName": "ZeroLabs_EAC-Attestation_f0763337.pdf",
        "mimeType": "application/pdf",
        "url": "https://proofs-api.zerolabs.green/api/files/d52cf9e9-8a50-48e9-83e3-6753c14178d5"
    },
    "pageUrl": "https://proofs.zerolabs.green/partners/filecoin/purchases/5253751e-9072-4c05-a3ae-e42428baa429"
} as FullPurchaseDto;
