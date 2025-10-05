import React, { type ComponentProps, type ReactElement } from 'react';
import { screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { render } from 'vitest-browser-react';

import store from '../Store';
// import * as actionCreators from '../Store/actionCreators';

import Component from './Playingfield';

type PlayingFieldProps = ComponentProps<typeof Component>;

let mockRandom = 5;
vi.mock('lodash-es', () => ({ random: vi.fn().mockImplementation(() => mockRandom) }));

describe('Playingfield', () => {
  beforeEach(() => {
    mockRandom = 5;
  });

  const resizeObserver = mockResizeObserver();
  const defaultProps: PlayingFieldProps = {};
  // https://github.com/testing-library/react-testing-library/issues/780#issuecomment-687525893
  const renderWithStore = (element: ReactElement) =>
    render(element, {
      wrapper: (props) => (
        <Provider
          store={store}
          {...props}
        />
      ),
    });

  it('should render', () => {
    renderWithStore(<Component {...defaultProps} />);

    expect(screen.getByTestId('playingfield')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const { container } = renderWithStore(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not show the the logo on load until wrapper dimensions have been determined', async () => {
    renderWithStore(<Component {...defaultProps} />);

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
    renderWithStore(<Component {...defaultProps} />);

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
    renderWithStore(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    act(() => {
      resizeObserver.resize();
    });

    // expect(actionCreators.startGame).toHaveBeenCalled();
  });

  it('should render the logo in white on load', async () => {
    renderWithStore(<Component {...defaultProps} />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    await act(async () => {
      resizeObserver.resize();
    });

    expect((await screen.findByRole('figure')).getAttribute('style')).toContain('white');
  });
});
