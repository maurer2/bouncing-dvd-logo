import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Store, { colours } from '../Store';

import Component from './Sound';

describe('Components', () => {
  const storeValues = {
    colours: [...colours],
    soundIsDisabled: false,
    toggleSound: jest.fn(),
  };

  const StoreProvider = ({ children }) => (
    <Store.Provider value={storeValues}>
      {children}
    </Store.Provider>
  );

  const defaultProps = { triggerSound: false };
  const setup = (props) => render(
    <StoreProvider key={props?.key}>
      <Component {...defaultProps} {...props} />
    </StoreProvider>,
  );

  it('should not render when triggerSound is false', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toBeNull();
    expect(screen.queryByTestId('audio-tag')).not.toBeInTheDocument();
    expect(screen.queryByTestId('audio-file')).not.toBeInTheDocument();
  });

  it('should render when triggerSound is true (first time after being false on previous render)', () => {
    const screen = setup({ triggerSound: true });

    expect(screen.getByTestId('audio-tag')).toBeInTheDocument();
  });

  it('should match snapshot when triggerSound is false', () => {
    const screen = setup({ });

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when triggerSound is true', () => {
    const screen = setup({ triggerSound: true });

    expect(screen.container.firstChild).toMatchSnapshot();
  });
});
