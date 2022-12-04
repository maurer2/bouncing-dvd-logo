import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Component from './SoundPlayer';
import type { SoundPlayerProps } from './SoundPlayer.types';

const mockPlay = vi.spyOn(window.HTMLAudioElement.prototype, 'play').mockImplementation(() => Promise<void>);

describe('Components', () => {
  const defaultProps: SoundPlayerProps = { shouldTriggerSound: false };
  const setup = (props: Partial<SoundPlayerProps> = {}) =>
    render(
      <Component
        {...defaultProps}
        {...props}
      />,
    );

  it('has child components', () => {
    const screen = setup({});

    expect(screen.queryByTestId('audio-tag')).toBeInTheDocument();
    expect(screen.queryByTestId('audio-file')).toBeInTheDocument();
  });

  it('should play sound when shouldTriggerSound is true', () => {
    setup({ shouldTriggerSound: true });

    expect(mockPlay).toHaveBeenCalled();
  });

  it.skip('should match snapshot when triggerSound is false', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it.skip('should match snapshot when triggerSound is true', () => {
    const screen = setup({ shouldTriggerSound: true });

    expect(screen.container.firstChild).toMatchSnapshot();
  });
});
