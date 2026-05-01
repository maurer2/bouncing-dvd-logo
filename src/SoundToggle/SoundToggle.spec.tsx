import React, { type ComponentProps } from 'react';
import { screen } from '@testing-library/react';
import { render } from 'vitest-browser-react';
import { userEvent } from '@vitest/browser/context';
import { beforeEach } from 'vitest';

import { useStore } from '../Store2';

import Component from './SoundToggle';
import type SoundToggle from './SoundToggle';

type SoundToggleProps = ComponentProps<typeof SoundToggle>;

let storeDispatchSpy: unknown;

describe('Components', () => {
  const defaultProps: SoundToggleProps = {};

  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);

    const storeDispatchSpyTemp = vi.spyOn(useStore.getState(), 'dispatch');
    storeDispatchSpy = storeDispatchSpyTemp;

    return () => {
      (storeDispatchSpy as typeof storeDispatchSpyTemp).mockReset();
    };
  });

  it('should render', () => {
    render(<Component />);

    expect(screen.getByRole('button', { name: 'Play sound' })).toBeInTheDocument();
  });

  it('should match snapshots', () => {
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: true },
    });
    const { container, rerender } = render(<Component />);

    expect(container.firstChild).toMatchSnapshot('Sound is disabled');

    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: false },
    });
    rerender(<Component />);

    expect(container.firstChild).toMatchSnapshot('Sound is enabled');
  });

  it('should have child elements', () => {
    render(<Component />);

    expect(screen.getByTestId('soundtoggle-icon')).toBeInTheDocument();
  });

  it('should render the button as pressed with the "Play sound" label when sound is enabled', () => {
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: false },
    });

    render(<Component />);

    expect(screen.getByLabelText('Play sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Play sound')).toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0
  });

  it('should render the button as not-pressed with the "Play sound" label when sound is disabled', () => {
    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: true },
    });
    render(<Component />);

    useStore.setState({
      flags: { isPaused: true, isPlayingSound: false, isSoundDisabled: false },
    });

    expect(screen.getByLabelText('Play sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Play sound')).not.toBePressed();
  });

  it('should trigger sound toggle function on click', async () => {
    const user = userEvent.setup();

    const { rerender } = render(<Component />);

    await user.click(screen.getByRole('button', { name: 'Play sound' }));

    expect(storeDispatchSpy).toHaveBeenCalledWith({
      type: 'SOUND_STATE_TOGGLED',
    });

    rerender(<Component />);

    await user.click(screen.getByRole('button', { name: 'Play sound' }));
    expect(storeDispatchSpy).toHaveBeenCalledWith({
      type: 'SOUND_STATE_TOGGLED',
    });
  });
});
