export const offerMockData = {
  createdBy: 'John Smith',
  position: 'Sales manager',
  manager: 'Monsoon Carbon',
  requestId: '#1234567890',
  offerId: '#ABC4567DEF',
  productSummary: 'EAC / I-REC / Future / France / Solar',
  reservedUntil: '2021-11-26T05:49:40.971Z',
  quantity: '3000000',
  price: 5,
  paymentMethods: {
    wire: '(SEPA-EU)',
    crypto: 'DAI, USDC, USDT, ETH, EWT',
  },
  products: [
    {
      address: 'f0112027',
      generationStart: '2020-11-01T05:49:40.971Z',
      generationEnd: '2020-12-31T05:49:40.971Z',
      volume: '3000000',
    },
    {
      address: 'f0212014',
      generationStart: '2020-11-01T05:49:40.971Z',
      generationEnd: '2020-12-31T05:49:40.971Z',
      volume: '6000000',
    },
  ],
};

export const wireTransferDataMock = {
  accountHolder: 'Monsoon Carbon LTD',
  iban: 'FR12500A08170648489890',
  swift: 'FRECR/23',
  amount: '15',
  currency: 'USD',
  transferConcept: 'Zero Offer #ABC4567DEF',
};

export const cryptoPaymentDataMock = {
  blockchain: 'Ethereum or EnergyWebChain',
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  amountAndCurrency: [
    '15 DAI or USDC or USDT',
    '0,004647732835923 ETH (@3227.41 USD/ETH)',
    '1,832844574780059 EWT ( @8.25 USD/EWT)',
  ],
  transferConcept: 'Zero Offer #ABC4567DEF',
};
