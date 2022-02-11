/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Store from '../Store';

import Component from './Controls';

describe('Components', () => {
  let storeValues = {
    colours: ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'],
    soundIsDisabled: true,
    toggleSound: jest.fn(),
  };

  const StoreProvider = ({ children }) => (
    <Store.Provider value={storeValues}>
      {children}
    </Store.Provider>
  );

  const setup = (props) => render(
    <StoreProvider key={props?.key}>
      <Component {...props} />
    </StoreProvider>,
  );

  it('should render ', () => {
    const screen = setup({});

    expect(screen.getByTestId('controls')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('controls')).toBeTruthy();

    expect(screen.getByTestId('controls-control')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();

    expect(screen.getByTestId('controls-icon')).toBeTruthy();
  });

  it('should have sound off icon, when sound is disabled', () => {
    const screen = setup({});

    expect(screen.getByText('sound-off.svg')).toBeTruthy();
  });

  it('should have sound on icon, when sound is enabled', () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const screen = setup({ key: 'on' });

    expect(screen.getByText('sound-on.svg')).toBeTruthy();
  });
});
