import { render } from '@testing-library/react';

import Breadcrumbs from './breadcrumbs';
import { HelmetProvider } from 'react-helmet-async';

describe('Breadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <Breadcrumbs breadcrumbList={['one', 'two', 'three']} />
      </HelmetProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
