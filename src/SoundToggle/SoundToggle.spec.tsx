import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Component from './SoundToggle';
import type { SoundToggleProps } from './SoundToggle.types';

describe('Components', () => {
  const defaultProps: SoundToggleProps = {
    soundIsDisabled: true,
    toggleSound: vi.fn(),
  };
  const setup = (props: Partial<SoundToggleProps> = {}) =>
    render(
      <Component
        {...defaultProps}
        {...props}
      />,
    );

  it('should render', () => {
    const screen = setup({});

    expect(screen.getByTestId('soundtoggle')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('soundtoggle')).toBeTruthy();
    expect(screen.getByTestId('soundtoggle-icon')).toBeTruthy();
  });

  it('should have "Enable sound" text when sound is off', () => {
    const screen = setup({});

    expect(screen.getByLabelText('Enable sound')).toBeInTheDocument();
  });

  it('should have "Disable sound" text when sound is off', () => {
    const screen = setup({
      soundIsDisabled: false,
    });

    expect(screen.getByLabelText('Disable sound')).toBeInTheDocument();
  });

  it('should trigger sound toggle function on click, when sound is off', async () => {
    const screen = setup({});

    await userEvent.click(screen.getByTestId('soundtoggle'));
    expect(defaultProps.toggleSound).toHaveBeenCalled();
  });

  it('should trigger sound toggle function on click, when sound is on', async () => {
    const screen = setup({
      soundIsDisabled: false,
    });

    await userEvent.click(screen.getByTestId('soundtoggle'));
    expect(defaultProps.toggleSound).toHaveBeenCalled();
  });
});
