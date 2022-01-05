import { render } from '@testing-library/react';

import CopyToClipboard from './copy-to-clipboard';

describe('CopyToClipboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CopyToClipboard value={'example value'} />);
    expect(baseElement).toBeTruthy();
  });
});
