/**
 * Colors och Fonts för appen (light & dark mode)
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#ffffff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    // Extra färger
    primary: "#1e90ff",       // huvudfärg (blå)
    primaryDark: "#155e9c",   // mörkare variant för tryck/hover
    muted: "#6b7280",         // sekundär grå text
    surface: "#f9fafb",       // bakgrund på kort/ytor
    shadow: "#e5e7eb",        // skuggor, borders
    borderLight: "#e5e7eb",   // ljus border
  },
  dark: {
    text: "#ECEDEE",
    background: "#082432ff",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    // Extra färger
    primary: "#1e90ff",
    primaryDark: "#155e9c",
    muted: "#9ca3af",
    surface: "#1f2937",     // mörk yta
    shadow: "#000000",      // mörkare skugga
    borderLight: "#374151", // mörk border
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
