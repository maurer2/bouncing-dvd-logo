import React, {
  useState, FC, PropsWithChildren, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import Store from '../Store';

import * as Types from './Settings.types';

const Settings: FC<PropsWithChildren<Types.SettingsProps>> = ({ children }): JSX.Element => {
  const [soundIsDisabled, setSoundIsDisabled] = useState(true);

  const toggleSound = (): void => setSoundIsDisabled((prevSoundIsDisabled) => !prevSoundIsDisabled);

  const storeValue = useMemo(() => {
    const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'];

    return {
      colours,
      soundIsDisabled,
      toggleSound,
    };
  }, [soundIsDisabled]);

  return (
    <Store.Provider value={storeValue}>
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
