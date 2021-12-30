import { render } from '@testing-library/react';

import GetHelpBox from './get-help-box';

describe('GetHelpBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GetHelpBox />);
    expect(baseElement).toBeTruthy();
  });
});
