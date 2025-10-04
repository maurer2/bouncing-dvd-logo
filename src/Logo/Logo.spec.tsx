import React, { type ComponentProps } from 'react';
import { screen, within } from '@testing-library/react';
import { render } from 'vitest-browser-react';
// import 'jest-styled-components';

import { colours } from '../Store/constants';

import Component from './Logo';

type LogoProps = ComponentProps<typeof Component>;

describe('Logo', () => {
  const defaultProps: LogoProps = {
    positionX: 100,
    positionY: 100,
    width: 100,
    height: 100,
    currentColour: colours[0],
  };

  // const triggerColourChangeProp: LogoProps = {
  //   ...defaultProps,
  //   currentColour: colours[1],
  // };

  it('should render ', () => {
    render(<Component {...defaultProps} />);

    expect(screen.getByRole('figure')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Component {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have the cat logo', () => {
    render(<Component {...defaultProps} />);

    const parent = within(screen.getByRole('figure'));
    expect(parent.getByRole('img', { name: 'Cat logo' })).toBeInTheDocument();
  });

  it('should have the default colour', () => {
    render(<Component {...defaultProps} />);

    // expect(screen.getByRole('figure')).toHaveStyle(`color: ${colours[0]}`);
    expect(screen.getByRole('figure')).toHaveStyle(`color: rgb(255, 255, 255)`);
  });

  // it('should change colour', async () => {
  //   const { rerender, getByTestId } = setup({});
  //   const startColour = getByTestId('logo-element').style.getPropertyValue('color');

  //   rerender(
  //     <Component
  //       {...defaultProps}
  //       {...triggerColourChangeProp}
  //     />,
  //   );

  //   const coloursWithoutStartColour = colours.filter((colour) => colour !== startColour);
  //   const currentColour = getByTestId('logo-element').style.getPropertyValue('color');

  //   expect(coloursWithoutStartColour).toContain(currentColour);
  //   expect(coloursWithoutStartColour).not.toContain(startColour);

  //   expect(getByTestId('logo-element').style.getPropertyValue('color')).not.toBe(colours[0]);
  //   expect(getByTestId('logo-element')).toHaveStyle(`color: ${currentColour}`);
  // });

  // const cycles: number[] = Array.from(Array(10).keys());
  // it.each(cycles)('should have a new colour after rerender/useEffect - Cycle %i', () => {
  //   const { rerender, getByTestId } = setup({});
  //   const startColour = getByTestId('logo-element').style.getPropertyValue('color');

  //   rerender(
  //     <Component
  //       {...defaultProps}
  //       {...triggerColourChangeProp}
  //     />,
  //   );

  //   const currentColour = getByTestId('logo-element').style.getPropertyValue('color');

  //   expect(startColour).not.toEqual(currentColour);
  // });
});
