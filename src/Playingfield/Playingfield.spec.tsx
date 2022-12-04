import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { colours } from '../Store/constants';

import Component from './Playingfield';
import type { PlayingfieldProps } from './Playingfield.types';

let mockRandom = 10;
vi.mock('lodash-es', () => ({ random: vi.fn().mockImplementation(() => mockRandom) }));

describe('Playingfield', () => {
  beforeEach(() => {
    mockRandom = 10;
  });

  const defaultProps: PlayingfieldProps = {
    isPaused: false,
    triggerCollision: vi.fn(),
    currentColor: colours[0],
  };

  const setup = (props: Partial<PlayingfieldProps> = {}) =>
    render(
      <Component
        {...defaultProps}
        {...props}
      />,
    );

  it('should render ', () => {
    const screen = setup({});

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it.skip('should have random start value', () => {
    mockRandom = 25;

    const screen = setup({});

    expect(screen.getByTestId('logo-element').style.getPropertyValue('translate')).toBe(
      `translate(${mockRandom}px, ${mockRandom}px)`,
    );
  });
});
