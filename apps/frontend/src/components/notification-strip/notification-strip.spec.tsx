import { render } from '@testing-library/react';

import NotificationStrip from './notification-strip';

describe('NotificationStrip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <NotificationStrip text="Some EAC’s have been retired in your name" />
    );
    expect(baseElement).toBeTruthy();
  });
});
