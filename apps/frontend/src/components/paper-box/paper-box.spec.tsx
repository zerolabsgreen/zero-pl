import { render } from '@testing-library/react';

import PaperBox from './paper-box';

describe('PaperBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaperBox />);
    expect(baseElement).toBeTruthy();
  });
});
