import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Store from '../Store';

import Component from './Logo';
import { LogoProps } from './Logo.types';

describe('Logo', () => {
  const storeValues = { colours: ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] };

  const defaultProps: LogoProps = {
    positionX: 100,
    positionY: 100,
    width: 100,
    height: 100,
    changeColours: false,
    isPaused: false,
  };

  const triggerColourChangeProp: LogoProps = {
    ...defaultProps,
    changeColours: true,
  };

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

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
    expect(screen.getByTestId('cat-logo')).toBeTruthy();
  });

  it('should have initial colour', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element').style.getPropertyValue('color')).toBe(
      storeValues.colours[0],
    );
    expect(screen.getByTestId('logo-element')).toHaveStyle(`color: ${storeValues.colours[0]}`);
  });

  it('should change colour', async () => {
    const { rerender, getByTestId } = setup({});
    const startColour = getByTestId('logo-element').style.getPropertyValue('color');

    rerender(
      <StoreProvider>
        <Component {...defaultProps} {...triggerColourChangeProp} />
      </StoreProvider>,
    );

    const coloursWithoutStartColour = storeValues.colours.filter(
      (colour) => colour !== startColour,
    );
    const currentColour = getByTestId('logo-element').style.getPropertyValue('color');

    expect(coloursWithoutStartColour).toContain(currentColour);
    expect(coloursWithoutStartColour).not.toContain(startColour);

    expect(getByTestId('logo-element').style.getPropertyValue('color')).not.toBe(
      storeValues.colours[0],
    );
    expect(getByTestId('logo-element')).toHaveStyle(`color: ${currentColour}`);
  });
});
