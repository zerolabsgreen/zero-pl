import { PurchaseEventDTO } from "@energyweb/zero-protocol-labs-api-client";

export const blockchainEventsMock: PurchaseEventDTO[] = [
    {
        "type": "transfer",
        "timestamp": 1635523425,
        "txHash": "0x2e1f473bad6443e1b88a180510734df9e05faf8ab484379933baeb796003ee7c",
        "blockHash": "0xc1ceccac8430fad747a1e6d75279ea487935e3240e6977a80b69e9740541fb69",
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0xAa86D3ad47d27c1fEF9931F7AE0538370CFd432A",
        "recs": "622",
        "date": new Date(1635523425).toISOString(),
    },
    {
        "type": "transfer",
        "timestamp": 1635523465,
        "txHash": "0xbad01ebc4bcad576bc0a22f53317ed0cff1d5d11263d05464d014da8569d4e6d",
        "blockHash": "0x2625265c1c3bed5aa5ad4837508eddda4b5d2413e015e11fc5cafa2a6da51964",
        "from": "0xAa86D3ad47d27c1fEF9931F7AE0538370CFd432A",
        "to": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
        "recs": "622",
        "date": new Date(1635523465).toISOString(),
    },
    {
        "type": "transfer",
        "timestamp": 1635525475,
        "txHash": "0x92300833a9607ba9ae575b13d7025b003790e4d0c37e8ca5e1850f918d12b345",
        "blockHash": "0x02321d49390418c48cac973dcc85f14d216ec8fa9f9c23a3b1bcf2c4d5b9ba37",
        "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
        "to": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
        "recs": "108",
        "date": new Date(1635525475).toISOString(),
    },
    {
        "type": "transfer",
        "timestamp": 1635525480,
        "txHash": "0x60458089f29e248c303ae3e1d018dff30a110e244d79868966fe080cdeddd3a0",
        "blockHash": "0x3fdd2f47f32eb5ee52bfce5e60ba91d0dd1e46ca2c5c209621bc5962f1aadf16",
        "from": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
        "to": "0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9",
        "recs": "108",
        "date": new Date(1635525480).toISOString(),
    },
    {
        "type": "claim",
        "timestamp": 1635525530,
        "txHash": "0x1d60de8fa4d5e77d6c3b89b1e49ea9d9435a8844380fdd8dfc4646b631c35c6c",
        "blockHash": "0xc979a857570fff64e84c006f4d26ae1b70e7be5e5e0495712fbc895e9f5d22aa",
        "from": "0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9",
        "to": "0x0000000000000000000000000000000000000000",
        "recs": "108",
        "date": new Date(1635525530).toISOString(),
    }
];
