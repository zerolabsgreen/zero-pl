import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache, materialTheme } from '../utils';
import { useAxiosDefaults } from '../hooks/useAxiosDefaults';
import Header from '../components/common/Header';

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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Zero</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={materialTheme}>
          <CssBaseline />
          <Header />
          <Component {...pageProps}/>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default ZeroApp;
