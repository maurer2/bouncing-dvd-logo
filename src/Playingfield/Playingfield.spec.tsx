import React, { createRef, type ComponentProps } from 'react';
import { screen, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { render } from 'vitest-browser-react';

import { useStore } from '../Store2';

import Component from './Playingfield';

type PlayingFieldProps = ComponentProps<typeof Component>;

let mockRandom = 5;
let storeDispatchSpy: unknown;

vi.mock('es-toolkit', async () => {
  const originalModule = await vi.importActual('es-toolkit');

  return {
    ...originalModule,
    random: vi.fn().mockImplementation(() => mockRandom),
  };
});

describe('Playingfield', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);
    mockRandom = 5;

    const storeDispatchSpyTemp = vi.spyOn(useStore.getState(), 'dispatch');
    storeDispatchSpy = storeDispatchSpyTemp;

    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    return () => {
      (storeDispatchSpy as typeof storeDispatchSpyTemp).mockReset();
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const resizeObserver = mockResizeObserver();
  const defaultProps: PlayingFieldProps = {
    ref: createRef(),
  };

  it('should render', () => {
    render(<Component {...defaultProps} />);

    expect(screen.getByTestId('playingfield')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const { container, rerender } = render(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    rerender(<Component {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not show the the logo on load until wrapper dimensions have been determined', async () => {
    render(<Component {...defaultProps} />);

    expect(screen.queryByRole('img', { name: 'Cat logo' })).not.toBeInTheDocument();

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(await screen.findByRole('img', { name: 'Cat logo' })).toBeInTheDocument();
  });

  it('should show logo be in the middle of the screen on load once the wrapper dimensions have been determined', async () => {
    render(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(await screen.findByRole('img', { name: 'Cat logo' })).toBeInTheDocument();
    expect(await screen.findByRole('figure')).toBeInTheDocument();

    expect((await screen.findByRole('figure')).getAttribute('style')).toContain('translate');
  });

  it('should call startGame action on start', async () => {
    render(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(storeDispatchSpy).toHaveBeenCalledWith({
      type: 'GAME_STARTED',
    });
  });

  it('should render the logo with default colour (white) on load', async () => {
    render(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    await act(async () => {
      resizeObserver.resize();
    });

    expect((await screen.findByRole('figure')).getAttribute('style')).toContain('white');
  });
});
