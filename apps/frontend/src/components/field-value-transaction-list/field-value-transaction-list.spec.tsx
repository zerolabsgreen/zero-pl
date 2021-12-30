import { render } from '@testing-library/react';

import FieldValueTransactionList from './field-value-transaction-list';

describe('FieldValueTransactionList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FieldValueTransactionList
        generationPeriod={{ fromDate: '2020-02-02', toDate: '2021-12-02' }}
        transactionList={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
