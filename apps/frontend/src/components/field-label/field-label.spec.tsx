import { render } from '@testing-library/react';

import FieldLabel from './field-label';

describe('FieldLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldLabel />);
    expect(baseElement).toBeTruthy();
  });
});
