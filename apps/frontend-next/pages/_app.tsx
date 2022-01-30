import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache, materialTheme } from '../utils';
import { useAxiosDefaults } from '../hooks/useAxiosDefaults';
import Header from '../components/common/Header';
import { useRouter } from 'next/router';
import { SelectedProtocolProvider } from '../context';

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface ZeroAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function ZeroApp(props: ZeroAppProps) {
  useAxiosDefaults();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const isWizardRoute = router.pathname.includes('wizard');
  const wrappedComponent = isWizardRoute ? (
    <SelectedProtocolProvider>
      <Component {...pageProps} />
    </SelectedProtocolProvider>
  ) : (<Component {...pageProps} />);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Zero</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={materialTheme}>
          <CssBaseline />
          <Header />
          {wrappedComponent}
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default ZeroApp;
