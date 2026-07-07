import { createTheme } from 'styled-components';

export const accentColourNames = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] as const;
type AccentColourNames = (typeof accentColourNames)[number];

export const theme = createTheme({
  colors: {
    background: 'oklch(0.1448 0 0)',
    foreground: 'oklch(100% 0 0)',
    accent: {
      white: 'oklch(100% 0 0)',
      red: 'oklch(63% 0.25 25)',
      blue: 'oklch(62% 0.23 260)',
      yellow: 'oklch(92% 0.18 105)',
      fuchsia: 'oklch(70% 0.32 330)',
      lime: 'oklch(87% 0.24 135)',
    } as const satisfies Record<AccentColourNames, string>, // guarantees that theme.accent keys match accentColourNames
  } as const,
});

export type Theme = typeof theme;
