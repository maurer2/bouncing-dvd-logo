import React, { type ComponentProps } from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Component from './SoundPlayer';

type SoundPlayerProps = ComponentProps<typeof Component>;

const mockPlay = vi
  .spyOn(window.HTMLAudioElement.prototype, 'play')
  .mockImplementation(() => Promise.resolve());

describe('SoundPlayer', () => {
  const defaultProps: SoundPlayerProps = { shouldTriggerSound: false };

  it('should render ', () => {
    render(<Component {...defaultProps} />);

    expect(screen.getByTestId('audio-tag')).toBeInTheDocument();
  });

  it('should match snapshots', () => {
    const { container } = render(<Component {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('has child components', () => {
    render(<Component {...defaultProps} />);

    expect(screen.queryByTestId('audio-tag')).toBeInTheDocument();
    expect(screen.queryByTestId('audio-file')).toBeInTheDocument();
  });

  it('should play sound when shouldTriggerSound is set', () => {
    render(
      <Component
        {...defaultProps}
        shouldTriggerSound
      />,
    );

    expect(mockPlay).toHaveBeenCalled();
  });
});
