import React from 'react';
import { screen, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { userEvent } from 'vitest/browser';

import { renderStyledComponents } from '../test-utilities';
import { useStore } from '../Store2';

import Component from './Game';

let storeDispatchSpy: unknown;

vi.useFakeTimers();

describe('Game', () => {
  const resizeObserver = mockResizeObserver();

  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);

    const storeDispatchSpyTemp = vi.spyOn(useStore.getState(), 'dispatch');
    storeDispatchSpy = storeDispatchSpyTemp;

    return () => {
      (storeDispatchSpy as typeof storeDispatchSpyTemp).mockReset();
    };
  });

  it('should render', async () => {
    await renderStyledComponents(<Component />);

    expect(screen.getByTestId('game')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const { container } = await renderStyledComponents(<Component />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', async () => {
    await renderStyledComponents(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(screen.getByTestId('playingfield')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause button' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Cat logo' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Meow sound')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play sound' })).toBeInTheDocument();
    expect(screen.getByTestId('soundtoggle-icon')).toBeInTheDocument();
  });

  it('should render the pause button as not-pressed with the "Pause button" label when sound is not enabled', async () => {
    await renderStyledComponents(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText('Pause button')).not.toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0
  });

  it('should set keyboard focus on pause button on load if supported by browser', async () => {
    await renderStyledComponents(<Component />);

    expect(screen.getByRole('button', { name: 'Pause button' })).toEqual(document.activeElement);
  });

  it('should call togglePlayState action on click and pause/unpause the game', async () => {
    const user = userEvent.setup();
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: true },
    });
    await renderStyledComponents(<Component />);

    await user.click(screen.getByRole('button', { name: 'Pause button' }));

    expect(storeDispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'PLAY_STATE_TOGGLED',
      }),
    );
    expect(useStore.getState().flags.isPaused).toBeFalse();

    await user.click(screen.getByRole('button', { name: 'Pause button' }));

    expect(storeDispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'PLAY_STATE_TOGGLED',
      }),
    );
    expect(useStore.getState().flags.isPaused).toBeTrue();
  });

  it('should be paused on load and then unpause when ready', async () => {
    await renderStyledComponents(<Component />);

    expect(useStore.getState().flags.isPaused).toBeTrue();

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(useStore.getState().flags.isPaused).toBeFalse();
  });

  it('should toggle pause mode when clicking on pause button', async () => {
    const user = userEvent.setup();
    await renderStyledComponents(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toBePressed();

    await user.click(screen.getByRole('button', { name: 'Pause button' }));

    expect(screen.getByRole('button', { name: 'Pause button' })).toBePressed();

    await user.click(screen.getByRole('button', { name: 'Pause button' }));

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toBePressed();
  });

  it('should toggle pause mode when pressing space bar', async () => {
    const user = userEvent.setup();
    await renderStyledComponents(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(screen.getByLabelText('Pause button')).not.toBePressed();

    await user.keyboard('[Space]');

    expect(screen.getByRole('button', { name: 'Pause button' })).toBePressed();

    await user.keyboard('[Space]');

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toBePressed();
  });

  it('should toggle pause mode when pressing "k"-key', async () => {
    const user = userEvent.setup();
    await renderStyledComponents(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(screen.getByLabelText('Pause button')).not.toBePressed();

    await user.keyboard('k');
    expect(screen.getByRole('button', { name: 'Pause button' })).toBePressed();

    await user.keyboard('k');

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toBePressed();
  });

  it('should pause when resizing', async () => {
    await renderStyledComponents(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => resizeObserver.resize());

    expect(storeDispatchSpy).toHaveBeenCalledWith({
      type: 'GAME_STARTED',
    });
  });
});
