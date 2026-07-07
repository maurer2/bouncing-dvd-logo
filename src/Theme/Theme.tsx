import React, { type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { theme } from './tokens';

type ThemeProps = {
  children: ReactNode;
};

export const GlobalStyles = createGlobalStyle`
  @layer base {
    :root {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }

    :where(body) {
      inline-size: 100dvi;
      block-size: 100dvb;
      overflow: clip;
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto, Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
      background: ${({ theme: currentTheme }) => currentTheme.colors.background};
    }
  }
`;

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>
    {/* CSS vars */}
    <theme.GlobalStyle />
    {/* Base styles */}
    <GlobalStyles />
    {children}
  </ThemeProvider>
);
