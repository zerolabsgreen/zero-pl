import { render } from '@testing-library/react';

import FieldValueMultiline from './field-value-multiline';

describe('FieldValueMultiline', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FieldValueMultiline textValues={['Line 1', 'Line 2']} />
    );
    expect(baseElement).toBeTruthy();
  });
});
