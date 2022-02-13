import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';

import type { PlayingfieldProps } from '../Playingfield/Playingfield.types';

import Component from './Game';

// eslint-disable-next-line react/display-name
jest.mock('../Playingfield/Playingfield', () => (props: PlayingfieldProps) => {
  const { isPaused } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const testid = props['data-testid'];

  return (
    <div
      data-testid={testid}
      data-ispaused={isPaused ? 'true' : 'false'}
    >
      Playingfield
    </div>
  );
});

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

  const defaultProps = {};

  const setup = (props) => render(<Component {...defaultProps} {...props} />);

  it('should render', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toBeTruthy();
    expect(screen.getByTestId('game-playfield')).toBeTruthy();
  });

  it('should have set focus on game wrapper if supported by browser', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toEqual(document.activeElement);
  });

  it('should activate sound when clicking on button when sound is disabled', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'false');

    act(() => {
      fireEvent.click(screen.getByTestId('game-wrapper'));
    });
    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'true');
  });

  it('should activate sound when pressing spacebar when sound is disabled', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'false');

    act(() => {
      fireEvent.keyPress(screen.getByTestId('game-wrapper'), {
        // key: ' ',
        // code: 'Space',
        charCode: 32,
      });
    });
    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'true');
  });

  it('should activate sound when pressing k when sound is disabled', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'false');

    act(() => {
      fireEvent.keyPress(screen.getByTestId('game-wrapper'), {
        // key: 'k',
        // code: 'KeyK',
        charCode: 75,
      });
    });
    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'true');
  });
});
