import { render } from '@testing-library/react';

import ProductPage from './product-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

describe('ProductPage', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <MemoryRouter>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ProductPage />
          </QueryClientProvider>
        </HelmetProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
