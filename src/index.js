import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from 'styled-components';

import Game from './Game/Game';

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    background-color: #000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <Game />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
