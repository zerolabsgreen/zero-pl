import { render } from '@testing-library/react';

import FieldValue from './field-value';

describe('FieldValue', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldValue />);
    expect(baseElement).toBeTruthy();
  });
});
