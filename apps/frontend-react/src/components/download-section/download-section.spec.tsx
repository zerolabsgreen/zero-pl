import { render } from '@testing-library/react';

import DownloadSection from './download-section';

describe('DownloadSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DownloadSection />);
    expect(baseElement).toBeTruthy();
  });
});
