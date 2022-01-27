import { makeThemeConfig } from "@energyweb/zero-protocol-labs-theme";
import createCache from "@emotion/cache";

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
}

export const { materialTheme } = makeThemeConfig();
