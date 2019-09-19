import React, { Component } from 'react';
import PropTypes from 'prop-types';

import store from '../store';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colours: ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'],
      soundIsDisabled: false,
    };
  }

  render() {
    const { colours, soundIsDisabled } = this.state;
    const { children } = this.props;

    return (
      <store.Provider
        value={{
          colours,
          soundIsDisabled,
        }}
      >
        { children }
      </store.Provider>
    );
  }
}

const { node, arrayOf, oneOfType } = PropTypes;

Settings.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]),
};

export default Settings;
