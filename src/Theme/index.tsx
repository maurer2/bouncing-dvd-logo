import { createTheme, createGlobalStyle } from 'styled-components';

const defaultTheme = createTheme({
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
    },
  } as const,
});
export { defaultTheme as theme };

type Theme = typeof defaultTheme;
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
  // @layer base {
    html {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }

    body {
      inline-size: 100dvi;
      block-size: 100dvb;
      overflow: clip;
      background: ${({ theme }) => theme.colors.background};
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto, Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  }
// }
`;
