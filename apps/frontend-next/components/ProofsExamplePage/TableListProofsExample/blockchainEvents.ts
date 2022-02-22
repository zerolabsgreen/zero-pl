import { PurchasesControllerGetBlockchainEvents200Item } from "@energyweb/zero-protocol-labs-api-client";

export const blockchainEventsMock = [
    {
        "name": "On Chain Registration",
        "timestamp": 1635523425,
        "transactionHash": "0x2e1f473bad6443e1b88a180510734df9e05faf8ab484379933baeb796003ee7c",
        "blockHash": "0xc1ceccac8430fad747a1e6d75279ea487935e3240e6977a80b69e9740541fb69",
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0xAa86D3ad47d27c1fEF9931F7AE0538370CFd432A",
        "recs": "622"
    },
    {
        "name": "Transfer of Ownership",
        "timestamp": 1635523465,
        "transactionHash": "0xbad01ebc4bcad576bc0a22f53317ed0cff1d5d11263d05464d014da8569d4e6d",
        "blockHash": "0x2625265c1c3bed5aa5ad4837508eddda4b5d2413e015e11fc5cafa2a6da51964",
        "from": "0xAa86D3ad47d27c1fEF9931F7AE0538370CFd432A",
        "to": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
        "recs": "622"
    },
    {
        "name": "Transfer of Ownership",
        "timestamp": 1635525475,
        "transactionHash": "0x92300833a9607ba9ae575b13d7025b003790e4d0c37e8ca5e1850f918d12b345",
        "blockHash": "0x02321d49390418c48cac973dcc85f14d216ec8fa9f9c23a3b1bcf2c4d5b9ba37",
        "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
        "to": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
        "recs": "108"
    },
    {
        "name": "Transfer of Ownership",
        "timestamp": 1635525480,
        "transactionHash": "0x60458089f29e248c303ae3e1d018dff30a110e244d79868966fe080cdeddd3a0",
        "blockHash": "0x3fdd2f47f32eb5ee52bfce5e60ba91d0dd1e46ca2c5c209621bc5962f1aadf16",
        "from": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
        "to": "0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9",
        "recs": "108"
    },
    {
        "name": "Certificate Redemption",
        "timestamp": 1635525530,
        "transactionHash": "0x1d60de8fa4d5e77d6c3b89b1e49ea9d9435a8844380fdd8dfc4646b631c35c6c",
        "blockHash": "0xc979a857570fff64e84c006f4d26ae1b70e7be5e5e0495712fbc895e9f5d22aa",
        "from": "0x8617658E4a8898CD8c41f95CdF4D3780791e6CF9",
        "to": "0x0000000000000000000000000000000000000000",
        "recs": "108"
    }
] as any as PurchasesControllerGetBlockchainEvents200Item[];

export const certificateTransactions = [
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x021897a8bded50754e4afb8d24cb8344d1d83a21bdf058e902fabf38723a0059",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "recs": "20"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x50d303f6a06468cef5e3a54f7e2486b46fa1d74b82785a0680a89b9cb2c495d5",
    "from": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "to": "0x47a75ab6aed0b02e99cac618e94934c19fd5ed62",
    "recs": "20"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0x187afe1c229cd157324f37cbfe7358122426ad36d76237c4b64f7ed417b49de5",
    "from": "0x47a75ab6aed0b02e99cac618e94934c19fd5ed62",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "20"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x7701de28f73617224890ba51a5c409cdf9804bf7e132c95e6699c85250a91352",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "recs": "14"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0xe4c10670a33ac80ca726ae9e5cfb095f2581a1acdc7b491fc3ac4ad190f64f07",
    "from": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "to": "0x1cebd219499b76f0d8bf5f85e1cd3ae890ae4f92",
    "recs": "14"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0xdb6e2f18002a8b50c0e1c31f8dca2a43745f80daca60586cf627c320c1c04fc0",
    "from": "0x1cebd219499b76f0d8bf5f85e1cd3ae890ae4f92",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "14"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x511f970cd34e8d2ec9e81e8bd08f32b28a3fd99fe263730d5b85fa938cf1cec3",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "recs": "18"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0xaba04d78f5d30d16069ac39b606a6c9ff79d3a92e109fa27081b278ae6215199",
    "from": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "to": "0x78131cc7c6bb630574134e409a26c17d96e47cba",
    "recs": "18"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0x4bd61f4feb6f62be2113d9380c6ccd8ae136fe237abfa3a6d63ac2a9a3bba220",
    "from": "0x78131cc7c6bb630574134e409a26c17d96e47cba",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "18"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x8f21c6f5a2a56eb5b4b091e40fad8806ffdf97e80b6803bc23b0dd449b4e8fb3",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "recs": "111"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0xf586ed9b9ceec98a1daeb568283362d0d0dd8935fbd7227aca9a3322bfe1b0e8",
    "from": "0xd927C3100b81C7883DfBEF67F92a4Ea1943fAE9E",
    "to": "0xa8e865df2485b0f5809686abdffe8cb2930b6d15",
    "recs": "111"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0x4a53cb6dda0adb625824cbb79d4c62202b236a597469f714e3dcff6d43b97e00",
    "from": "0xa8e865df2485b0f5809686abdffe8cb2930b6d15",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "111"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x8d42579db04f8301c54743d714581ccbc10e9b5482e80b960484a8d52fdf24a5",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0x3ac6213896efb97151237f14d7eaa28e826cc63e",
    "recs": "1"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x63d9d6a4c31579205d30205d50e66538f9f7080dcbd39f43bd426f0542fc6ea3",
    "from": "0x3ac6213896efb97151237f14d7eaa28e826cc63e",
    "to": "0xcfdaf19c2eb5c75acd93bb93c368762f686b807f",
    "recs": "1"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0x48b79950300f1adb6934559777648ee420cc749ccec34ea0f29ed6417e5177f7",
    "from": "0xcfdaf19c2eb5c75acd93bb93c368762f686b807f",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "1"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0xdbaee8dc7feb7f760117d8ec7a72c8bc2f856937ad2032b9cc52dbc3ea72810b",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0x3ac6213896efb97151237f14d7eaa28e826cc63e",
    "recs": "25"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0xe234dac07b286f47738f20633e2d7c1d33f8a76b25c18856513f63ff2ef3c660",
    "from": "0x3ac6213896efb97151237f14d7eaa28e826cc63e",
    "to": "0x346f8075725c16c5f99dc61e7dc8cdc6d2753fb6",
    "recs": "25"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0xa042d8ca6fb9c8cf0c862b58663312733096cb70146428ada01d02c3a261b058",
    "from": "0x346f8075725c16c5f99dc61e7dc8cdc6d2753fb6",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "25"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x9af051f6ecf8b1c28e3eda59bc906c88c7a94b475d808406e2723c3307264ede",
    "from": "0xDb2A3F1EA71A62aB0Bc83adeB845823f55D0b828",
    "to": "0x3ac6213896efb97151237f14d7eaa28e826cc63e",
    "recs": "20"
  },
  {
    "name": "Transfer of Ownership",
    "transactionHash": "0x893be89a36105103d15e780d6f22465286e5fd3510d3d30be83628596ec32891",
    "from": "0x3ac6213896efb97151237f14d7eaa28e826cc63e",
    "to": "0x13125d74928db2782abc14f3e342560f871a804e",
    "recs": "20"
  },
  {
    "name": "Certificate Redemption",
    "transactionHash": "0xd26d0f80729bb4c57b55f8abc3695f0cae88b52dcf7ef7045095458f76513af7",
    "from": "0xff0138687146744268b2aa9c7c0a0397a14b2416",
    "to": "0x0000000000000000000000000000000000000000",
    "recs": "20"
  },
]
