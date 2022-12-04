import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { colours } from '../Store/constants';

import Component from './Logo';
import type { LogoProps } from './Logo.types';

describe('Logo', () => {
  const defaultProps: LogoProps = {
    positionX: 100,
    positionY: 100,
    width: 100,
    height: 100,
    currentColour: colours[0],
    isPaused: false,
  };

  const triggerColourChangeProp: LogoProps = {
    ...defaultProps,
    currentColour: colours[1],
  };

  const setup = (props: Partial<LogoProps> = {}) =>
    render(
      <Component
        {...defaultProps}
        {...props}
      >
        Children
      </Component>,
    );

  it('should render ', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
    expect(screen.getByTestId('cat-logo')).toBeTruthy();
  });

  it('should have the initial colour', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element').style.getPropertyValue('color')).toBe(colours[0]);
    expect(screen.getByTestId('logo-element')).toHaveStyle(`color: ${colours[0]}`);
  });

  it('should change colour', async () => {
    const { rerender, getByTestId } = setup({});
    const startColour = getByTestId('logo-element').style.getPropertyValue('color');

    rerender(
      <Component
        {...defaultProps}
        {...triggerColourChangeProp}
      />,
    );

    const coloursWithoutStartColour = colours.filter((colour) => colour !== startColour);
    const currentColour = getByTestId('logo-element').style.getPropertyValue('color');

    expect(coloursWithoutStartColour).toContain(currentColour);
    expect(coloursWithoutStartColour).not.toContain(startColour);

    expect(getByTestId('logo-element').style.getPropertyValue('color')).not.toBe(colours[0]);
    expect(getByTestId('logo-element')).toHaveStyle(`color: ${currentColour}`);
  });

  const cycles: number[] = Array.from(Array(10).keys());
  it.each(cycles)('should have a new colour after rerender/useEffect - Cycle %i', () => {
    const { rerender, getByTestId } = setup({});
    const startColour = getByTestId('logo-element').style.getPropertyValue('color');

    rerender(
      <Component
        {...defaultProps}
        {...triggerColourChangeProp}
      />,
    );

    const currentColour = getByTestId('logo-element').style.getPropertyValue('color');

    expect(startColour).not.toEqual(currentColour);
  });
});
