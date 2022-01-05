import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import makeThemeConfig from './utils/makeThemeConfig';

export interface UiThemeProps {
  children: ReactNode;
}

export const { materialTheme } = makeThemeConfig();

export const UiTheme = ({ children }: UiThemeProps) => (
  <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
);

export default UiTheme;
