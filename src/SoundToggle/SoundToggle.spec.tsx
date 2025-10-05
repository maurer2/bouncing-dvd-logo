import React, { type ComponentProps } from 'react';
import { screen } from '@testing-library/react';
import { render } from 'vitest-browser-react';
import userEvent from '@testing-library/user-event';

import Component from './SoundToggle';
import type SoundToggle from './SoundToggle';

type SoundToggleProps = ComponentProps<typeof SoundToggle>;

describe('Components', () => {
  const defaultProps: SoundToggleProps = {
    isSoundDisabled: false,
    toggleSound: vi.fn(),
  };

  it('should render', () => {
    render(<Component {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Play sound' })).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Component {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    render(<Component {...defaultProps} />);

    expect(screen.getByTestId('soundtoggle-icon')).toBeInTheDocument();
  });

  it('should render the button as pressed with the "Play sound" label when sound is not enabled', () => {
    render(<Component {...defaultProps} />);

    expect(screen.getByLabelText('Play sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Play sound')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Play sound')).toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0
  });

  it('should render the button as not-pressed with the "Play sound" label when sound is disabled', () => {
    render(
      <Component
        {...defaultProps}
        isSoundDisabled
      />,
    );

    expect(screen.getByLabelText('Play sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Play sound')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByLabelText('Play sound')).not.toBePressed();
  });

  it('should trigger sound toggle function on click', async () => {
    const user = userEvent.setup();

    const { rerender } = render(<Component {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'Play sound' }));
    expect(defaultProps.toggleSound).toHaveBeenCalled();

    rerender(
      <Component
        {...defaultProps}
        isSoundDisabled
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Play sound' }));
    expect(defaultProps.toggleSound).toHaveBeenCalled();
  });
});
