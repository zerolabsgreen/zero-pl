import { render } from '@testing-library/react';

import FieldValueList from './field-value-list';

describe('FieldValueList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldValueList />);
    expect(baseElement).toBeTruthy();
  });
});
