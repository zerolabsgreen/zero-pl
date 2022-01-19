import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Auth0Provider } from "@auth0/auth0-react";
import { UiTheme } from '@energyweb/zero-protocol-labs-theme';
import App from './app/app';
import './assets/fonts/rajdhani/stylesheet.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <StrictMode>
    <CssBaseline />
    <HelmetProvider>
      <Auth0Provider
        domain="dev-dlyb4b7b.us.auth0.com"
        clientId="RfatjnzZkRtRGdMzLpAkghQH9iiqEkQN"
        redirectUri={window.location.origin}
      >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UiTheme>
            <App />
          </UiTheme>
        </BrowserRouter>
      </QueryClientProvider>
      </Auth0Provider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);
