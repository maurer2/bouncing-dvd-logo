import React, { Component } from 'react';
import './App.css';
import { ReactComponent as Logo } from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="app playfield">
        <Logo className="logo" />
      </div>
    );
  }
}

export default App;
