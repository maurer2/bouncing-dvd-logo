import React, { Component } from 'react';
import store from '../store';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colours: ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'],
    };
  }

  render() {
    const { colours } = this.state;
    const { children } = this.props;

    return (
      <store.Provider
        value={{
          colours,
        }}
      >
        { children }
      </store.Provider>
    );
  }
}

export default Settings;
