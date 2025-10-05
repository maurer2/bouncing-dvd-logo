import React, { type ReactElement } from 'react';
import { screen, render, act } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../Store';
// import * as actionCreators from '../Store/actionCreators';

import Component from './Game';

// type GameProps = ComponentProps<typeof Component>;

vi.useFakeTimers();
// vi.spyOn(actionCreators, 'togglePlayState');
// userEvent.setup({ delay: null });

describe('Game', () => {
  const resizeObserver = mockResizeObserver();

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
    renderWithStore(<Component />);

    expect(screen.getByTestId('game')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = renderWithStore(<Component />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have child elements', async () => {
    renderWithStore(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(screen.getByTestId('playingfield')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause button' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Cat logo' })).toBeInTheDocument();
    expect(screen.getByTestId('audio-tag')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play sound' })).toBeInTheDocument();
    expect(screen.getByTestId('soundtoggle-icon')).toBeInTheDocument();
  });

  it('should render the pause button as not-pressed with the "Pause button" label when sound is not enabled', async () => {
    renderWithStore(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText('Pause button')).not.toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0
  });

  it('should set keyboard focus on pause button on load if supported by browser', () => {
    renderWithStore(<Component />);

    expect(screen.getByRole('button', { name: 'Pause button' })).toEqual(document.activeElement);
  });

  // it('should call togglePlayState action on click', async () => {
  //   const user = userEvent.setup();

  //   renderWithStore(<Component />);

  //   await user.click(screen.getByRole('button', { name: 'Pause button' }));

  //   expect(actionCreators.togglePlayState).toHaveBeenCalled();
  // });

  it.skip('should be paused on load and then unpause when ready', () => {
    renderWithStore(<Component />);

    expect(screen.getByRole('button', { name: 'Pause button' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText('Pause button')).toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });

    expect(screen.getByRole('button', { name: 'Pause button' })).not.toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText('Pause button')).not.toBePressed(); // https://github.com/testing-library/jest-dom/releases/tag/v6.7.0
  });

  it.skip('should toggle pause mode when clicking on pause button', async () => {
    const user = userEvent.setup();

    renderWithStore(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(screen.getByLabelText('Pause button')).not.toBePressed();

    await user.click(screen.getByRole('button', { name: 'Pause button' }));
    expect(screen.getByLabelText('Pause button')).toBePressed();

    await user.click(screen.getByRole('button', { name: 'Pause button' }));
    expect(screen.getByLabelText('Pause button')).not.toBePressed();
  });

  it.skip('should toggle pause mode when pressing space bar', async () => {
    const user = userEvent.setup();

    renderWithStore(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(screen.getByLabelText('Pause button')).not.toBePressed();

    await user.keyboard('{space}');
    expect(screen.getByLabelText('Pause button')).toBePressed();

    await user.keyboard('{space}');
    expect(screen.getByLabelText('Pause button')).not.toBePressed();
  });

  it.skip('should toggle pause mode when pressing "k"-key', async () => {
    const user = userEvent.setup();

    renderWithStore(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    expect(screen.getByLabelText('Pause button')).not.toBePressed();

    await user.keyboard('k');
    expect(screen.getByLabelText('Pause button')).toBePressed();

    await user.keyboard('k');
    expect(screen.getByLabelText('Pause button')).not.toBePressed();
  });

  it.skip('resize should trigger key change e.g. reset', async () => {
    renderWithStore(<Component />);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1920, blockSize: 1080 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    const styleStringBeforeResize = screen.getByRole('figure').getAttribute('style');
    console.log(styleStringBeforeResize);

    resizeObserver.mockElementSize(screen.getByTestId('playingfield'), {
      contentBoxSize: { inlineSize: 1280, blockSize: 720 },
    });
    await act(async () => {
      resizeObserver.resize();
    });

    const styleStringAfterResize = (await screen).getByRole('figure').getAttribute('style');
    console.log(styleStringAfterResize);
  });

  it.todo('should pause when resizing');
});
