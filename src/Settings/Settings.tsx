import React, { useMemo, useReducer } from 'react';
import type { FC, PropsWithChildren, ReactElement, ReducerWithoutAction } from 'react';
import PropTypes from 'prop-types';

import Store, { colours } from '../Store';

import type * as Types from './Settings.types';

const Settings: FC<PropsWithChildren<Types.SettingsProps>> = ({ children }): ReactElement => {
  const [soundIsDisabled, toggleSound] = useReducer<ReducerWithoutAction<boolean>>(
    (currentSoundIsDisabled) => !currentSoundIsDisabled,
    true,
  );

  const storeValue = useMemo(
    () => ({
      colours: [...colours],
      soundIsDisabled,
      toggleSound,
    }),
    [soundIsDisabled],
  );

  return <Store.Provider value={storeValue}>{children}</Store.Provider>;
};

const { node, arrayOf, oneOfType } = PropTypes;

Settings.propTypes = { children: oneOfType([arrayOf(node), node]).isRequired };

export default Settings;
