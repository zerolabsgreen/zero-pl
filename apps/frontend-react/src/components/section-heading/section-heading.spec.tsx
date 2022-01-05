import { render } from '@testing-library/react';

import SectionHeading from './section-heading';

describe('SectionHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionHeading />);
    expect(baseElement).toBeTruthy();
  });
});
