const $blueExtraDark = '#19355E';
const $blueLight = '#4480DB';

const $green = '#00D08A';
const $greenLight = '#b1ebcd';

const $graphite = '#6A658A';

const $textColorDefault = '#a8a8a8';
const $simpleTextColor = '#ffffff';
const $inputBackgroundColor = '#F6F3F9';
const $inputTextColor = '#2D1155';
const $boxShadowColor = '#A09AC6';

const $bodyBackgroundColor = '#ffffff';
const $mainBackgroundColor = '#ffffff';
const $defaultBackgroundColor = '#F6F3F9';
const $filcoinBackgroundColor = '#F9F9F9';
const $fieldIconColor = '#ffffff';
const $white = '#ffffff';
const $black = '#000000';
const $filcoinColor = '#0090FF';
const $filcoinText = '#5CB8FF';
const $filcoinColorLight = '#E5F4FF';

const $switchGrayColor = '#A0A0A0';
const $switchBgColorBlue = '#B3DEFF';
const $switchBgColorGray = '#C8C8CA';

const $fontFamilyPrimary = 'Rajdhani';
const $fontFamilySecondary = 'Rajdhani';

const $fontSize = 14;

export type UiThemeVariables = {
  primaryColor: string;
  primaryColorLight: string;
  primaryColorDark: string;
  primaryColorDim: string;
  secondaryColor: string;
  secondaryColorLight: string;
  textColorDefault: string;
  simpleTextColor: string;
  bodyBackgroundColor: string;
  defaultBackgroundColor: string;
  inputBackgroundColor: string;
  inputTextColor: string;
  mainBackgroundColor: string;
  fieldIconColor: string;
  fontFamilyPrimary: string;
  fontFamilySecondary: string;
  hoverTextColor: string;
  fontSize: number;
  white: string;
  black: string;
  filcoinColor: string;
  purpleLight: string;
  filcoinBackgroundColor: string;
  filcoinColorLight: string;
  filcoinText: string;
  graphite: string;
  switchGrayColor: string;
  switchBgColorBlue: string;
  switchBgColorGray: string;
  purpleText: string;
  purpleFooterText: string
  purpleExtraLight: string;
  purpleExtraLightSecondary: string;
  boxShadowColor: string;
};

export const variables: UiThemeVariables = {
  primaryColor: $blueExtraDark,
  primaryColorLight: $blueLight,
  primaryColorDark: $blueExtraDark,
  primaryColorDim: $blueExtraDark,
  secondaryColor: $green,
  secondaryColorLight: $greenLight,
  textColorDefault: $textColorDefault,
  simpleTextColor: $simpleTextColor,
  bodyBackgroundColor: $bodyBackgroundColor,
  mainBackgroundColor: $mainBackgroundColor,
  defaultBackgroundColor: $defaultBackgroundColor,
  fieldIconColor: $fieldIconColor,
  fontFamilyPrimary: $fontFamilyPrimary,
  fontFamilySecondary: $fontFamilySecondary,
  fontSize: $fontSize,
  inputBackgroundColor: $inputBackgroundColor,
  inputTextColor: $inputTextColor,
  hoverTextColor: $white,
  white: $white,
  filcoinColor: $filcoinColor,
  black: $black,
  graphite: $graphite,
  purpleLight: $blueLight,
  filcoinBackgroundColor: $filcoinBackgroundColor,
  filcoinColorLight: $filcoinColorLight,
  filcoinText:$filcoinText,
  switchGrayColor:$switchGrayColor,
  switchBgColorBlue:$switchBgColorBlue,
  switchBgColorGray:$switchBgColorGray,
  purpleExtraLight:$blueLight,
  purpleText:$blueLight,
  purpleFooterText:$blueLight,
  purpleExtraLightSecondary: $blueLight,
  boxShadowColor: $boxShadowColor,
};
