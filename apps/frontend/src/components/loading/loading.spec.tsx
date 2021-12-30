import { render } from '@testing-library/react';

import Loading from './loading';
import { HelmetProvider } from 'react-helmet-async';

describe('Loading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <Loading />
      </HelmetProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
