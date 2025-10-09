import React, { createRef, type ComponentProps } from 'react';
import { screen, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { render } from 'vitest-browser-react';

import { useStore } from '../Store2';

import Component from './Playingfield';

type PlayingFieldProps = ComponentProps<typeof Component>;

let mockRandom = 5;
vi.mock('lodash-es', () => ({ random: vi.fn().mockImplementation(() => mockRandom) }));

describe('Playingfield', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState(), true);
    mockRandom = 5;
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

  it.skip('should call startGame action on start', async () => {
    render(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    act(() => {
      resizeObserver.resize();
    });

    // expect(actionCreators.startGame).toHaveBeenCalled();
  });

  it('should render the logo in white on load', async () => {
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
