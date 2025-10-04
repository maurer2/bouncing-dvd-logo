import React, { type ComponentProps } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
// import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../Store';
import * as actionCreators from '../Store/actionCreators';

import Component from './Game';

type GameProps = ComponentProps<typeof Component>;

vi.useFakeTimers();
vi.spyOn(actionCreators, 'togglePlayState');
// userEvent.setup({ delay: null });

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

    expect(screen.getByTestId('game')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('game')).toBeTruthy();
    expect(screen.getByTestId('playingfield')).toBeTruthy();
    expect(screen.getByTestId('pausebutton')).toBeTruthy();
    expect(screen.getByTestId('soundtoggle')).toBeTruthy();
  });

  it('should set focus on pause button if supported by browser', () => {
    const screen = setup({});

    expect(screen.getByTestId('pausebutton')).toEqual(document.activeElement);
  });

  it('should call togglePlayState action on click', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('pausebutton')).toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('pausebutton'));
    expect(actionCreators.togglePlayState).toHaveBeenCalled();
  });

  it('should be paused on start and then start when ready', () => {
    const screen = setup({});
    const playingfield = screen.getByTestId('playingfield');
    resizeObserver.mockElementSize(playingfield, {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    expect(screen.queryByLabelText('Unpause')).not.toBeInTheDocument();

    act(() => {
      resizeObserver.resize();
    });

    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    expect(screen.queryByLabelText('Unpause')).not.toBeInTheDocument();
  });

  it('should unpause when clicking on pause button when in pause mode', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('pausebutton')).toBeInTheDocument();
    expect(screen.getByLabelText('Pause')).toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('pausebutton'));
    await fireEvent.click(screen.getByTestId('pausebutton'));
    // await userEvent.click(screen.getByTestId('pausebutton')););
    expect(screen.queryByLabelText('Pause')).toBeInTheDocument();
  });

  it('should pause when clicking on game when in unpause mode', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('pausebutton')).toBeInTheDocument();
    await fireEvent.click(screen.getByTestId('pausebutton'));
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('pausebutton'));
    await fireEvent.click(screen.getByTestId('pausebutton'));
    // await userEvent.click(screen.getByTestId('pausebutton'));
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();
  });

  it.skip('should unpause when pressing spacebar when in pause mode', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('pausebutton')).toBeInTheDocument();
    // await fireEvent.click(screen.getByTestId('pausebutton'))
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();

    screen.getByTestId('pausebutton').focus();
    // await userEvent.type(screen.getByTestId('pausebutton'), '{space}');
    await fireEvent.keyUp(screen.getByTestId('pausebutton'), { charCode: 32 });

    expect(actionCreators.togglePlayState).toHaveBeenCalled();
    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
  });

  it.skip('should unpause when pressing k when in non-pause mode', async () => {
    const screen = setup({});

    expect(screen.queryByTestId('pausebutton')).toBeInTheDocument();
    expect(screen.getByLabelText('Unpause')).toBeInTheDocument();

    await fireEvent.keyPress(screen.getByTestId('pausebutton'), { charCode: 75 });
    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
  });

  it.skip('resize should trigger key change e.g. reset', async () => {
    const screen = setup();
    resizeObserver.mockElementSize(screen.getByTestId('game'), {
      contentBoxSize: { inlineSize: 1280, blockSize: 1280 },
    });

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
    const styleStringBeforeResize = screen.getByTestId('logo-element').getAttribute('style');
    console.log(styleStringBeforeResize);

    await act(() => {
      resizeObserver.resize(screen.getByTestId('game'));
    });

    const styleStringAfterResize = await screen
      .queryByTestId('logo-element')
      ?.getAttribute('style');
    console.log(styleStringAfterResize);
  });

  it.todo('should pause when resizing');
});
