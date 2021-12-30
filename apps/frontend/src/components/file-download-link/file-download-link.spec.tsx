import { render } from '@testing-library/react';

import FileDownloadLink from './file-download-link';

describe('FileDownoadLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileDownloadLink />);
    expect(baseElement).toBeTruthy();
  });
});
