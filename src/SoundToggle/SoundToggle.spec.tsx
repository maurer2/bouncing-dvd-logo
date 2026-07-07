import React from 'react';
import { screen } from '@testing-library/react';
import { beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

import { useStore } from '../Store';

import Component from './SoundToggle';

let storeDispatchSpy: unknown;

describe('Components', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);

    const storeDispatchSpyTemp = vi.spyOn(useStore.getState(), 'dispatch');
    storeDispatchSpy = storeDispatchSpyTemp;

    return () => {
      (storeDispatchSpy as typeof storeDispatchSpyTemp).mockReset();
    };
  });

  it('should render', async () => {
    await render(<Component />);

    expect(screen.getByRole('button', { name: 'Play sound' })).toBeInTheDocument();
  });

  it('should match snapshots', async () => {
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: true },
    });
    const { container, rerender } = await render(<Component />);

    expect(container.firstChild).toMatchSnapshot('Sound is disabled');

    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: false },
    });
    await rerender(<Component />);

    expect(container.firstChild).toMatchSnapshot('Sound is enabled');
  });

  it('should have child elements', async () => {
    await render(<Component />);

    expect(screen.getByTestId('soundtoggle-icon')).toBeInTheDocument();
  });

  it('should render the button as pressed with the "Play sound" label when sound is enabled', async () => {
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: false },
    });

    await render(<Component />);

    expect(screen.getByLabelText('Play sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Play sound')).toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0
  });

  it('should render the button as not-pressed with the "Play sound" label when sound is disabled', async () => {
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: true },
    });
    await render(<Component />);

    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: false },
    });

    expect(screen.getByLabelText('Play sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Play sound')).not.toBePressed();
  });

  it('should trigger sound toggle function on click', async () => {
    const user = userEvent.setup();

    const { rerender } = await render(<Component />);

    await user.click(screen.getByRole('button', { name: 'Play sound' }));

    expect(storeDispatchSpy).toHaveBeenCalledWith({
      type: 'SOUND_STATE_TOGGLED',
    });

    await rerender(<Component />);

    await user.click(screen.getByRole('button', { name: 'Play sound' }));
    expect(storeDispatchSpy).toHaveBeenCalledWith({
      type: 'SOUND_STATE_TOGGLED',
    });
  });
});
