import { render } from '@testing-library/react';

import EthereumAddress from './ethereum-address';

describe('EthereumAddress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EthereumAddress address={'0x12344Aa939c81E88453cb7751E6B10309474A2d9'} />
    );
    expect(baseElement).toBeTruthy();
  });
});
