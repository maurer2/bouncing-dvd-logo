import React from 'react';
import '@testing-library/jest-dom';
import { render, within } from '@testing-library/react';
import 'jest-styled-components';

import Store, { colours } from '../Store';

import Component from './Playingfield';
import { PlayingfieldProps } from './Playingfield.types';

let mockRandom = 10;
jest.mock('lodash-es', () => ({ random: jest.fn().mockImplementation(() => mockRandom) }));

describe('Playingfield', () => {
  beforeEach(() => {
    // mockRandom = jest.spyOn(global.Math, 'random');
    // mockRandom.mockReturnValue(0.123456);
    mockRandom = 10;
  });

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

  it('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have random start value', () => {
    mockRandom = 25;

    const screen = setup({});

    expect(screen.getByTestId('logo-element').style.getPropertyValue('transform')).toBe(
      `translate(${mockRandom}px, ${mockRandom}px)`,
    );
  });

  it('should have no paused attribute when game is running', () => {
    const props: PlayingfieldProps = { isPaused: false };
    const screen = setup(props);

    expect(screen.getByTestId('playfingfield')).toHaveAttribute('data-status', 'active');

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have paused attribute when game is paused', () => {
    const props: PlayingfieldProps = { isPaused: true };
    const screen = setup(props);

    expect(screen.getByTestId('playfingfield')).toHaveAttribute('data-status', 'inactive');

    expect(screen.container.firstChild).toMatchSnapshot();
  });
});
