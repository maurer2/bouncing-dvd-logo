import React from 'react';
import '@testing-library/jest-dom';
import { render, act, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { mockResizeObserver } from 'jsdom-testing-mocks';

import store from '../Store';
import * as actionCreators from '../Store/actionCreators';

import Component from './Playingfield';
import type { PlayingfieldProps } from './Playingfield.types';

let mockRandom = 5;
vi.mock('lodash-es', () => ({ random: vi.fn().mockImplementation(() => mockRandom) }));
vi.spyOn(actionCreators, 'startGame');

describe('Playingfield', () => {
  beforeEach(() => {
    mockRandom = 5;
  });

  const resizeObserver = mockResizeObserver();
  const defaultProps: PlayingfieldProps = {};

  const setup = (props: Partial<PlayingfieldProps> = {}) =>
    render(
      <Provider store={store}>
        <Component
          {...defaultProps}
          {...props}
        />
      </Provider>,
    );

  it.only('should render', () => {
    const screen = setup({});

    expect(screen.getByTestId('playingfield')).toBeInTheDocument();
  });

  it.only('should have logo hidden on startup until wrapper dimensions have been determined', () => {
    const screen = setup({});

    expect(screen.queryByTestId('logo-element')).not.toBeInTheDocument();
    const playingfield = screen.getByTestId('playingfield');
    resizeObserver.mockElementSize(playingfield, {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    act(() => {
      resizeObserver.resize();
    });

    expect(screen.queryByTestId('logo-element')).toBeInTheDocument();
  });

  it.skip('should match snapshot', () => {
    const screen = setup({});

    expect(screen.container.firstChild).toMatchSnapshot();
  });

  it.skip('should show logo be in the middle of the screen', async () => {
    const screen = setup({});
    const playingfield = screen.getByTestId('playingfield');
    resizeObserver.mockElementSize(playingfield, {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    act(() => {
      resizeObserver.resize();
    });

    await waitFor(() => {
      expect(screen.getByTestId('logo-element').getAttribute('style')).toContain('transform');
    });
  });

  it.only('should call startGame action on start', async () => {
    const screen = setup({});
    const playingfield = screen.getByTestId('playingfield');
    resizeObserver.mockElementSize(playingfield, {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    act(() => {
      resizeObserver.resize();
    });

    expect(actionCreators.startGame).toHaveBeenCalled();
  });

  it.only('should begin with white as start colour', async () => {
    const screen = setup({});
    const playingfield = screen.getByTestId('playingfield');
    resizeObserver.mockElementSize(playingfield, {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    act(() => {
      resizeObserver.resize();
    });

    expect(screen.getByTestId('logo-element').getAttribute('style')).toContain('white');
  });
});
