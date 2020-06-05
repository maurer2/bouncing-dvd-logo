import React, { useState, FC } from 'react';
import PropTypes from 'prop-types';

import Store from '../Store';

const Settings: FC<any> = ({ children }): JSX.Element => {
  const [soundIsDisabled, setSoundIsDisabled] = useState(true);

  const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'];

  const toggleSound = () => setSoundIsDisabled((prevSoundIsDisabled) => !prevSoundIsDisabled);

  return (
    <Store.Provider
      value={{
        colours,
        soundIsDisabled,
        toggleSound,
      }}
    >
      { children }
    </Store.Provider>
  );
};

const { node, arrayOf, oneOfType } = PropTypes;

Settings.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default Settings;
