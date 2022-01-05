import { render } from '@testing-library/react';

import FieldValueWithContent from './field-value-with-content';

describe('FieldValueWithContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldValueWithContent />);
    expect(baseElement).toBeTruthy();
  });
});
