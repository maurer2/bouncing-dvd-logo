import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'vitest-browser-react';

import { useStore } from '../Store2';

import Component from './SoundPlayer';

const mockPlay = vi
  .spyOn(window.HTMLAudioElement.prototype, 'play')
  .mockImplementation(async () => {});

describe('SoundPlayer', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);
  });

  it('should render ', async () => {
    await render(<Component />);

    expect(screen.queryByLabelText('Meow sound')).toBeInTheDocument();
  });

  it('should match snapshots', async () => {
    const { container } = await render(<Component />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('has child components', async () => {
    await render(<Component />);

    expect(screen.queryByLabelText('Meow sound')).toBeInTheDocument();
    expect(screen.queryByTestId('audio-file')).toBeInTheDocument();
    expect(screen.queryByTestId('subtitles-file')).toBeInTheDocument();
  });

  it('should play sound when isPlayingSound is set and sound is enabled', async () => {
    useStore.setState({
      flags: { isPaused: false, isPlayingSound: true, isSoundDisabled: false },
    });

    await render(<Component />);

    expect(mockPlay).toHaveBeenCalled();
  });
});
