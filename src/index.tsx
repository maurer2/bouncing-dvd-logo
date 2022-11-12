import React from 'react';
import { createRoot } from 'react-dom/client';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import Settings from './Settings/Settings';
import Game from './Game/Game';

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
  }

  body {
    overflow: hidden;
  }
`;

const App = () => (
  <Settings>
    <Normalize />
    <GlobalStyles />
    <Game />
  </Settings>
);

const container = document.getElementById('root');

if (!container) {
  throw new Error('root element not found');
}

const root = createRoot(container);
root.render(<App />);
