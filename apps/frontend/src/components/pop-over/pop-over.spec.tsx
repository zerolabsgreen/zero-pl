import { render } from '@testing-library/react';

import PopOver from './pop-over';

describe('PopOver', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PopOver popoverContent={'Hello!'}>
        <div>I have popover</div>
      </PopOver>
    );
    expect(baseElement).toBeTruthy();
  });
});
