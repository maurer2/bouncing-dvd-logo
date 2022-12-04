import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../Store';

import Component from './Game';
import type { GameProps } from './Game.types';

vi.useFakeTimers();
userEvent.setup({ delay: null });

describe('Game', () => {
  const resizeObserver = mockResizeObserver();

  const setup = (props: Partial<GameProps> = {}) =>
    render(
      <Provider store={store}>
        <Component {...props}>Children</Component>
      </Provider>,
    );

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
    expect(screen.getByTestId('playfingfield')).toBeTruthy();
    expect(screen.getByTestId('game-pausebutton')).toBeTruthy();
  });

  it.skip('should have set focus on game wrapper if supported by browser', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toEqual(document.activeElement);
  });

  it('should not be paused by default', () => {
    const screen = setup({});

    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    expect(screen.queryByLabelText('Unpause')).not.toBeInTheDocument();
  });

  it('should pause when clicking on game when in non pause mode', async () => {
    const screen = setup();

    expect(screen.queryByTestId('game-pausebutton')).toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('game-pausebutton'));
    // await userEvent.click(screen.getByTestId('game-pausebutton'));
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();
    expect(screen.queryByLabelText('Pause')).not.toBeInTheDocument();
  });

  it('should unpause when clicking on game when in pause mode', async () => {
    const screen = setup();

    expect(screen.queryByTestId('game-pausebutton')).toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('game-pausebutton'));
    await fireEvent.click(screen.getByTestId('game-pausebutton'));
    // await userEvent.click(screen.getByTestId('game-pausebutton'));
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();
    expect(screen.queryByLabelText('Pause')).not.toBeInTheDocument();
  });

  it('should pause when pressing spacebar when in non-pause mode', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('game-pausebutton')).toBeInTheDocument();

    await fireEvent.keyPress(screen.getByTestId('game-pausebutton'), { charCode: 32 });
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();
  });

  it('should pause when pressing k when in non-pause mode', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('game-pausebutton')).toBeInTheDocument();

    await fireEvent.keyPress(screen.getByTestId('game-pausebutton'), { charCode: 75 });
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();
  });

  it.skip('resize should trigger key change e.g. reset', async () => {
    const screen = setup();
    resizeObserver.mockElementSize(screen.getByTestId('game-wrapper'), {
      contentBoxSize: { inlineSize: 1280, blockSize: 1280 },
    });

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
    const styleStringBeforeResize = screen.getByTestId('logo-element').getAttribute('style');
    console.log(styleStringBeforeResize);

    await act(() => {
      resizeObserver.resize(screen.getByTestId('game-wrapper'));
    });

    const styleStringAfterResize = await screen
      .queryByTestId('logo-element')
      ?.getAttribute('style');
    console.log(styleStringAfterResize);
  });

  it.todo('should pause when resizing');
});
