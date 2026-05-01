import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import 'modern-normalize/modern-normalize.css'; // todo: move to global CSS in correct layer

import { theme, GlobalStyles } from './Theme';
import Game from './Game/Game';

function App() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        {/* CSS vars */}
        <theme.GlobalStyle />
        {/* Global styles */}
        <GlobalStyles />
        <Game />
      </ThemeProvider>
    </StrictMode>
  );
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('root element not found');
}

const root = createRoot(container);
root.render(<App />);
