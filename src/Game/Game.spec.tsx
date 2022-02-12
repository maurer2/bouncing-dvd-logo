import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Component from './Game';

// Mock child components
jest.mock('../Playingfield/Playingfield', () => ({
  __esModule: true,
  default: () => (<div>Mocked Playingfield component</div>),
}));

describe('Game', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'ResizeObserver', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })),
    });
  });

  const setup = (props) => render(<Component {...props} />);

  it('should render ', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it.skip('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-playfield')).toBeTruthy();
  });

  it.todo('should activate sound when clicking on button when sound is disabled');
  it.todo('should deactivate sound when clicking on button when sound is enabled');
});
