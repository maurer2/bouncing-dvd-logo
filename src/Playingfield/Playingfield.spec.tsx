import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Store, { colours } from '../Store';

import Component from './Playingfield';
import { PlayingfieldProps } from './Playingfield.types';

describe('Playingfield', () => {
  const storeValues = {
    colours: [...colours],
    soundIsDisabled: true,
    toggleSound: jest.fn(),
  };

  const defaultProps: PlayingfieldProps = { isPaused: false };

  const StoreProvider = ({ children }) => (
    <Store.Provider value={storeValues}>{children}</Store.Provider>
  );

  const setup = (props) => render(
    <StoreProvider key={props?.key}>
      <Component {...defaultProps} {...props} />
    </StoreProvider>,
  );

  it('should render ', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
  });
});
