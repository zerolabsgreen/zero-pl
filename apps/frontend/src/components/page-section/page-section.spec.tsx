import { render } from '@testing-library/react';

import PageSection from './page-section';

describe('PageSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageSection />);
    expect(baseElement).toBeTruthy();
  });
});
