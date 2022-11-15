import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import userEvent from '@testing-library/user-event'

import type { StoreType } from '../Store';
import Store, { colours } from '../Store';

import Component from './Game';

vi.useFakeTimers();
userEvent.setup({delay: null})

describe('Game', () => {
  const storeValues: StoreType = {
    colours: [...colours],
    soundIsDisabled: true,
    toggleSound: vi.fn(),
  };

  const StoreProvider = ({ children }) => (
    <Store.Provider value={storeValues}>{children}</Store.Provider>
  );

  const resizeObserver = mockResizeObserver();

  const setup = (props = {}) =>
    render(
      <StoreProvider>
        <Component {...props}>
          Children
        </Component>
      </StoreProvider>
    );

  it('should render', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toBeTruthy();
    expect(screen.getByTestId('playfingfield')).toBeTruthy();
  });

  it('should have set focus on game wrapper if supported by browser', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toEqual(document.activeElement);
  });

  it('should not be paused by default', () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'false');
  });

  it('should pause when clicking on game wrapper', async () => {
    const screen = setup();

    expect(screen.queryByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'false');

    await fireEvent.click(screen.getByTestId('game-wrapper'));
    expect(screen.getByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'true');
  });

  it('should activate sound when pressing spacebar when sound is disabled', async () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'false');

    await fireEvent.keyPress(screen.getByTestId('game-wrapper'), { charCode: 32 });
    expect(screen.getByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'true');
  });

  it('should activate sound when pressing k when sound is disabled', async () => {
    const screen = setup({});

    expect(screen.getByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'false');

    await fireEvent.keyPress(screen.getByTestId('game-wrapper'), { charCode: 75 });
    expect(screen.getByTestId('game-wrapper')).toHaveAttribute('data-ispaused', 'true');
  });

  it.skip('resize should trigger key change e.g. reset', async () => {
    const screen = setup();
    resizeObserver.mockElementSize(screen.getByTestId('game-wrapper'), {
      contentBoxSize: { inlineSize: 1280, blockSize: 1280 },
    });

    expect(screen.getByTestId('logo-element')).toBeInTheDocument();
    const styleStringBeforeResize = screen.getByTestId('logo-element').getAttribute('style')
    console.log(styleStringBeforeResize);

    await act(() => {
      resizeObserver.resize(screen.getByTestId('game-wrapper'));
    });

    const styleStringAfterResize = await screen.queryByTestId('logo-element').getAttribute('style')
    console.log(styleStringAfterResize);
  });

  it.todo('should pause when resizing');
});
