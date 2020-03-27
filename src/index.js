import React from 'react';
import ReactDOM from 'react-dom';
import { normalize } from 'styled-normalize';

import { createGlobalStyle } from 'styled-components/macro';

import Settings from './Settings/Settings';
import Game from './Game/Game';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const App = () => (
  <Settings>
    <GlobalStyles />
    <Game />
  </Settings>
);

ReactDOM.render(<App />, document.getElementById('root'));
