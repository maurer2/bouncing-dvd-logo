import React, { type ComponentProps } from 'react';
import { screen, within } from '@testing-library/react';

import { renderStyledComponents } from '../test-utilities';
import { accentColourNames as colours /* theme */ } from '../Theme/tokens';

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

  const triggerColourChangeProp: LogoProps = {
    ...defaultProps,
    currentColour: colours[1],
  };

  it('should render ', async () => {
    await renderStyledComponents(<Component {...defaultProps} />);

    expect(screen.getByRole('figure')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const { container } = await renderStyledComponents(<Component {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have the cat logo', async () => {
    await renderStyledComponents(<Component {...defaultProps} />);

    const parent = within(screen.getByRole('figure'));
    expect(parent.getByRole('img', { name: 'Cat logo' })).toBeInTheDocument();
  });

  it('should have the default colour', async () => {
    await renderStyledComponents(<Component {...defaultProps} />);

    expect(screen.getByRole('figure')).toHaveStyle('color: oklch(100% 0 0)');
    // expect(screen.getByRole('figure')).toHaveStyle(`color: ${theme.colors.accent.white}`);
  });

  it('should change colour', async () => {
    const { rerender } = await renderStyledComponents(<Component {...defaultProps} />);

    const parent = screen.getByRole('figure');
    const startColour = parent.style.getPropertyValue('color');

    await rerender(
      <Component
        {...defaultProps}
        {...triggerColourChangeProp}
      />,
    );

    const currentColour = parent.style.getPropertyValue('color');

    expect(currentColour).not.toEqual(startColour);
    // expect(screen.getByRole('figure')).toHaveStyle(`color: ${theme.colors.accent.red}`);
    expect(parent).toHaveStyle('color: oklch(0.63 0.25 25)');
  });

  it.each(colours.map((_, index) => index))(
    'should have a new colour after rerenderStyledComponents - Cycle %i',
    async () => {
      const { rerender } = await renderStyledComponents(<Component {...defaultProps} />);

      const parent = screen.getByRole('figure');
      const startColour = parent.style.getPropertyValue('color');

      await rerender(
        <Component
          {...defaultProps}
          {...triggerColourChangeProp}
        />,
      );

      const currentColour = parent.style.getPropertyValue('color');

      expect(startColour).not.toEqual(currentColour);
    },
  );
});
