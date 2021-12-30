import { render } from '@testing-library/react';

import SellerInformation from './seller-information';

describe('SellerInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SellerInformation
        name={'Andrew Doe'}
        contactPerson={'John Doe'}
        addressFirstLine={'Address line 1'}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
