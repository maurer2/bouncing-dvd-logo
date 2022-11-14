import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';

import type { PlayingfieldProps } from '../Playingfield/Playingfield.types';

import Component from './Game';

jest.useFakeTimers();

// eslint-disable-next-line react/display-name
jest.mock('../Playingfield/Playingfield', () => (props: PlayingfieldProps) => {
  const { isPaused } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const testid = props['data-testid'];
  // eslint-disable-next-line react/destructuring-assignment
  const testkey = props['data-key'];

  return (
    <div
      data-testid={testid}
      data-ispaused={isPaused ? 'true' : 'false'}
      data-testkey={testkey}
    >
      Playingfield
    </div>
  );
});

const windowResizeHandler = jest.fn();

// Resize Observer mock
// Object.defineProperty(global, 'ResizeObserver', {
//   writable: true,
//   value: jest.fn().mockImplementation(() => ({
//     observe: jest.fn(),
//     unobserve: jest.fn(),
//   })),
// });
global.ResizeObserver = require('resize-observer-polyfill');

describe('Game', () => {
  const defaultProps = {};
  const setup = (props) =>
    render(
      <Component
        {...defaultProps}
        {...props}
      />,
    );

  const testWidth = 1280;

  beforeAll(() => {
    window.innerWidth = testWidth;
    window.addEventListener('resize', windowResizeHandler);

    window.dispatchEvent(new Event('resize'));
  });

  it('updates the window width', () => {
    expect(windowResizeHandler).toHaveBeenCalled();
    expect(window.innerWidth).toBe(testWidth);
  });

  it.skip('resize should trigger key change e.g. reset', async () => {
    const screen = setup({});

    // const keyBeforeResize = screen.getByTestId('game-playfield').getAttribute('data-testkey');
    // expect(screen.container.firstChild).toMatchSnapshot();

    window.innerWidth = testWidth;
    expect(windowResizeHandler).toHaveBeenCalled();

    // const keyAfterResize = screen.getByTestId('game-playfield').getAttribute('data-testkey');
    expect(screen.container.firstChild).toMatchSnapshot();
    // expect(keyBeforeResize).not.toEqual(keyAfterResize);
  });

  it('should render', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
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
      fireEvent.keyPress(screen.getByTestId('game-wrapper'), { charCode: 32 });
    });
    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'true');
  });

  it('should activate sound when pressing k when sound is disabled', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'false');

    act(() => {
      fireEvent.keyPress(screen.getByTestId('game-wrapper'), { charCode: 75 });
    });
    expect(screen.getByTestId('game-playfield')).toHaveAttribute('data-ispaused', 'true');
  });

  it.todo('should pause when pressing spacebar');
  it.todo('should pause when resizing');
});
