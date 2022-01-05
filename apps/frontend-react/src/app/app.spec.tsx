import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { HelmetProvider } from 'react-helmet-async';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match inline snapshot', () => {
    const result = render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(result.container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-g1qh0m-StyledApp eoso2hl0"
  >
    <header
      style="background: rgb(45, 17, 85);"
    >
      <div
        class="MuiContainer-root MuiContainer-maxWidthXl css-19r6kue-MuiContainer-root"
      >
        <div
          class="MuiBox-root css-11z3fva"
        >
          <svg>
            logo.svg
          </svg>
        </div>
      </div>
    </header>
    <main>
      <div
        class="MuiContainer-root MuiContainer-maxWidthXl css-19r6kue-MuiContainer-root"
      >
        <div
          class="css-oiql4d-StyledNotFoundPage erkvlro0"
        >
          <svg>
            not_found.svg
          </svg>
        </div>
      </div>
    </main>
  </div>
</div>
`);
  });
});
