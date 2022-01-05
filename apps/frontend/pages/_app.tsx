import type { AppProps } from 'next/app';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { createEmotionCache, materialTheme } from '../src/utils';

const clientSideEmotionCache = createEmotionCache();

interface ZeroAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function ZeroApp(props: ZeroAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Zero</title>
      </Head>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default ZeroApp;
