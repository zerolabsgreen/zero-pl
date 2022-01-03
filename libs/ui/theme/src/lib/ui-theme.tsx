import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import makeThemeConfig from './utils/makeThemeConfig';
import CssBaseline from '@mui/material/CssBaseline';
/* eslint-disable-next-line */
export interface UiThemeProps {
  children: ReactNode;
}

const { materialTheme } = makeThemeConfig();

export const UiTheme = ({ children }: UiThemeProps) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
  </>
);

export default UiTheme;
