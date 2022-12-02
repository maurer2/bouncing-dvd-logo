import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import 'modern-normalize/modern-normalize.css';

import store from './Store2';
import Settings from './Settings/Settings';
import Game from './Game/Game';

const GlobalStyles = createGlobalStyle`
  html {
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
  <StrictMode>
    <Provider store={store}>
      <Settings>
        <GlobalStyles />
        <Game />
      </Settings>
    </Provider>
  </StrictMode>
);

const container = document.getElementById('root');
if (!container) {
  throw new Error('root element not found');
}

const root = createRoot(container);
root.render(<App />);
