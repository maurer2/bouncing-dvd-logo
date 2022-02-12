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
  });

  it('should have sound off icon, when sound is disabled', () => {
    const screen = setup({});

    expect(screen.getByTestId('controls-icon-off')).toBeTruthy();
  });

  it('should have sound on icon, when sound is enabled', () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const screen = setup({ key: 'on' });

    expect(screen.getByTestId('controls-icon-on')).toBeTruthy();
  });

  it.todo('should pause on mouse click');
  it.todo('should pause when pressing spacebar');
  it.todo('should pause when resizing');
});
