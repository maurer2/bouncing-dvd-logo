import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Store, { colours } from '../Store';
import type { StoreType } from '../Store';

import Component from './SoundTrigger';
import type * as Types from './SoundTrigger.types';

describe('Components', () => {
  let storeValues: StoreType;

  beforeEach(() => {
    storeValues = {
      colours: [...colours],
      soundIsDisabled: true,
      toggleSound: vi.fn(),
    };
  });

  const StoreProvider = ({ children }) => (
    <Store.Provider value={storeValues}>{children}</Store.Provider>
  );

  const setup = (props?: Types.SoundTriggerProps, key = 'key') =>
    render(
      <StoreProvider key={key}>
        <Component {...props} />
      </StoreProvider>,
    );

  it('should render', () => {
    const screen = setup();

    expect(screen.getByTestId('soundtrigger')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup();

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup();

    expect(screen.getByTestId('soundtrigger')).toBeTruthy();
    expect(screen.getByTestId('soundtrigger-icon')).toBeTruthy();
    expect(screen.getByTestId('soundtrigger-text')).toBeTruthy();
  });

  it('should have "Enable sound" text when sound is off', () => {
    const screen = setup();

    expect(screen.getByText('Enable sound')).toBeInTheDocument();
  });

  it('should have "Disable sound" text when sound is off', () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const screen = setup(undefined, 'on');
    expect(screen.getByText('Disable sound')).toBeInTheDocument();
  });

  it('should trigger sound toggle function on click, when sound is off', async () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const toggleSoundSpy = vi.spyOn(storeValues, 'toggleSound')
    const screen = setup();

    await userEvent.click(screen.getByTestId('soundtrigger'))
    expect(toggleSoundSpy).toHaveBeenCalled();
  });

  it('should trigger sound toggle function on click, when sound is on', async () => {
    storeValues = {
      ...storeValues,
    };

    const toggleSoundSpy = vi.spyOn(storeValues, 'toggleSound')
    const screen = setup();

    await userEvent.click(screen.getByTestId('soundtrigger'))
    expect(toggleSoundSpy).toHaveBeenCalled();
  });
});
