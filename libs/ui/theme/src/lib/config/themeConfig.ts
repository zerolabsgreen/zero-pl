import {
  createTheme,
  darken,
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles';
import { variables } from './variables';
import { enUS, plPL } from '@material-ui/core/locale';
import { IStyleConfig } from '../utils/makeThemeConfig';

const getThemeConfig = (styleConfig: IStyleConfig): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: styleConfig.PRIMARY_COLOR,
      dark: styleConfig.PRIMARY_COLOR_DARK,
      light: styleConfig.PRIMARY_COLOR_LIGHT,
      contrastText: styleConfig.SIMPLE_TEXT_COLOR,
    },
    secondary: {
      main: styleConfig.SECONDARY_COLOR,
      light: styleConfig.SECONDARY_COLOR_LIGHT,
    },
    background: {
      paper: styleConfig.MAIN_BACKGROUND_COLOR,
      default: styleConfig.DEFAULT_BACKGROUND_COLOR,
    },
    text: {
      primary: styleConfig.SIMPLE_TEXT_COLOR,
      secondary: styleConfig.TEXT_COLOR_DEFAULT,
      disabled: styleConfig.TEXT_COLOR_DEFAULT,
    },
    success: {
      main: '#ABDE19',
    },
    warning: {
      main: '#FFB800',
    },
    error: {
      main: '#DA2042',
    },
  },
  typography: {
    fontFamily: styleConfig.FONT_FAMILY_PRIMARY,
    fontSize: styleConfig.FONT_SIZE,
    button: { textTransform: 'none' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: styleConfig.PRIMARY_COLOR,
          fontWeight: 600,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            '&:focus-visible': {
              outline: 'none',
            },
            border: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontWeight: 600, color: styleConfig.PRIMARY_COLOR },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: styleConfig.PRIMARY_COLOR,
          backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          lineHeight: '16px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: styleConfig.INPUT_TEXT_COLOR,
          backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          borderRadius: '5px 5px',
          maxHeight: '48px',
          '&.Mui-disabled': {
            backgroundColor: darken(styleConfig.INPUT_BACKGROUND_COLOR, 0.2),
          },
          '&.Mui-error': {
            border: '1px solid',
            borderColor: '#DA2042',
          },
          '&.Mui-focused': {
            backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '6px 8px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { fontSize: variables.fontSize },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          marginRight: '10px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: styleConfig.MAIN_BACKGROUND_COLOR,
          color: styleConfig.TEXT_COLOR_DEFAULT,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          '&.Mui-disabled': {
            color: styleConfig.TEXT_COLOR_DEFAULT,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 16,
          borderBottom: 'none',
        },
        body: {
          color: styleConfig.TEXT_COLOR_DEFAULT,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: styleConfig.PRIMARY_COLOR,
          '&.Mui-selected': {
            background: 'none',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: styleConfig.SIMPLE_TEXT_COLOR,
        },
        h5: {},
        body1: {},
        gutterBottom: {
          marginBottom: '1rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: styleConfig.PRIMARY_COLOR,
        },
      },
    },
    MuiCard: {
      styleOverrides: { root: { padding: '40px' } },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingBottom: '20px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
  },
});

const createMaterialTheme = (
  styleConfig: IStyleConfig,
  language: 'en'
): Theme => {
  const materialLocale =
    {
      pl: plPL,
      en: enUS,
    }[language] ?? enUS;

  return createTheme(getThemeConfig(styleConfig), materialLocale);
};

export default createMaterialTheme;
