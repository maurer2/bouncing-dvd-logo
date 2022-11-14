import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Store, { colours } from '../Store';
import type { StoreType } from '../Store';

import Component from './Controls';
import type * as Types from './Controls.types';

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

  const setup = (props?: Types.ControlProps, key = 'key') =>
    render(
      <StoreProvider key={key}>
        <Component {...props} />
      </StoreProvider>,
    );

  it('should render', () => {
    const screen = setup();

    expect(screen.getByTestId('controls')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const screen = setup();

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup();

    expect(screen.getByTestId('controls')).toBeTruthy();

    expect(screen.getByTestId('controls-button')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByTestId('controls-icon')).toBeTruthy();
  });

  it('should have sound inactive icon, when sound is off', () => {
    const screen = setup();

    expect(screen.getByTestId('controls-icon')).toHaveAttribute('status', 'inactive');
  });

  it('should have sound active icon, when sound is on', () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const screen = setup(undefined, 'on');
    expect(screen.getByTestId('controls-icon')).toHaveAttribute('status', 'active');
  });

  it('should trigger sound toggle function on click, when sound is off', async () => {
    storeValues = {
      ...storeValues,
      soundIsDisabled: false,
    };

    const toggleSoundSpy = vi.spyOn(storeValues, 'toggleSound')
    const screen = setup();

    await userEvent.click(screen.getByTestId('controls-button'))
    expect(toggleSoundSpy).toHaveBeenCalled();
  });

  it('should trigger sound toggle function on click, when sound is on', async () => {
    storeValues = {
      ...storeValues,
    };

    const toggleSoundSpy = vi.spyOn(storeValues, 'toggleSound')
    const screen = setup();

    await userEvent.click(screen.getByTestId('controls-button'))
    expect(toggleSoundSpy).toHaveBeenCalled();
  });
});
