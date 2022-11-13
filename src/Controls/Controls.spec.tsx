import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Store, { colours } from '../Store';

import Component from './Controls';

describe('Components', () => {
  let storeValues = {
    colours: [...colours],
    soundIsDisabled: true,
    toggleSound: jest.fn(),
  };

  const StoreProvider = ({ children }) => (
    <Store.Provider value={storeValues}>{children}</Store.Provider>
  );

  const setup = (props) =>
    render(
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

  it('should have sound inactive icon, when sound is off', () => {
    const screen = setup({});

    expect(screen.getByTestId('controls-icon')).toHaveAttribute('status', 'inactive');
  });

  it('should have sound active icon, when sound is on', () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const screen = setup({ key: 'on' });

    expect(screen.getByTestId('controls-icon')).toHaveAttribute('status', 'active');
  });

  it.todo('should pause on mouse click');
  it.todo('should pause when pressing spacebar');
  it.todo('should pause when resizing');
});
