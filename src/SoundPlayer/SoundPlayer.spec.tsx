import React, { type ComponentProps } from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import { useStore } from '../Store2';

import Component from './SoundPlayer';

type SoundPlayerProps = ComponentProps<typeof Component>;

const mockPlay = vi
  .spyOn(window.HTMLAudioElement.prototype, 'play')
  .mockImplementation(async () => {});

describe('SoundPlayer', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);
  });

  it('should render ', () => {
    render(<Component />);

    expect(screen.getByTestId('audio-tag')).toBeInTheDocument();
  });

  it('should match snapshots', () => {
    const { container } = render(<Component />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('has child components', () => {
    render(<Component />);

    expect(screen.queryByTestId('audio-tag')).toBeInTheDocument();
    expect(screen.queryByTestId('audio-file')).toBeInTheDocument();
  });

  it('should play sound when isPlayingSound is set and sound is enabled', () => {
    useStore.setState({
      flags: { isPaused: false, isPlayingSound: true, isSoundDisabled: false },
    });

    render(<Component />);

    expect(mockPlay).toHaveBeenCalled();
  });
});
