import React, {
  useCallback,
  useLayoutEffect,
  useReducer,
  useEffect,
  useState,
  useEffectEvent,
  useImperativeHandle,
  type RefObject,
} from 'react';
import { random } from 'es-toolkit';

import useCollisionDetection from '../Hooks/useCollisionDetection';
import Logo from '../Logo/Logo';
import { useIsPaused, useStoreActions, useCurrentColour } from '../Store';

import * as Styles from './Playingfield.styles';
import { reducers } from './reducers';

type PlayingFieldProps = {
  ref: RefObject<{ togglePlayStateInChild: () => void } | null>;
};

const logoSize: [width: number, height: number] = [150, 138.66];
const speed = 7;

const getInverseVelocity = (currentVelocity: number, maxRandomness = 10): number => {
  // oxfmt-ignore
  const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
  // oxfmt-ignore
  const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);
  const newInverseVelocity = currentVelocity * random(lowerRandomBound, upperRandomBound) * -1;

  return newInverseVelocity;
};

function PlayingField({ ref }: PlayingFieldProps) {
  const { startGame, triggerCollision, togglePlayState } = useStoreActions();
  const isPaused = useIsPaused();
  const currentColor = useCurrentColour();
  const [positions, dispatchLocal] = useReducer(reducers, {
    positionX: {
      value: null,
      velocity: 0,
    },
    positionY: {
      value: null,
      velocity: 0,
    },
  });
  const [playingFieldBoundingBox, setPlayingFieldBoundingBox] = useState<DOMRectReadOnly | null>(
    null,
  );
  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positions.positionX.value,
    logoSize[0],
    playingFieldBoundingBox?.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoSize[1],
    playingFieldBoundingBox?.height,
  );

  // https://tkdodo.eu/blog/ref-callbacks-react-19-and-the-compiler#react-19
  const playingFieldRefCB = useCallback((element: HTMLDivElement) => {
    const observer = new ResizeObserver((entries) => {
      const { contentRect } = entries[0];

      setPlayingFieldBoundingBox(contentRect);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const onFrameDraw = useEffectEvent(() => {
    if (!positions.positionX.velocity && !positions.positionY.velocity) {
      return;
    }

    if (isCollidingXStart || isCollidingXEnd) {
      triggerCollision();
      dispatchLocal({
        type: 'TRIGGER_X_COLLISION',
        payload: getInverseVelocity(positions.positionX.velocity),
      });
    }

    if (isCollidingYStart || isCollidingYEnd) {
      triggerCollision();
      dispatchLocal({
        type: 'TRIGGER_Y_COLLISION',
        payload: getInverseVelocity(positions.positionY.velocity),
      });
    }

    if (!isCollidingXStart && !isCollidingXEnd && !isCollidingYStart && !isCollidingYEnd) {
      dispatchLocal({
        type: 'TRIGGER_NEXT_POSITION',
      });
    }
  });

  useLayoutEffect(() => {
    let currentRequestID: number | null = null;

    const requestNewFrameDraw = () => {
      onFrameDraw();
      currentRequestID = requestAnimationFrame(requestNewFrameDraw);
    };

    // first frame request
    if (!isPaused) {
      currentRequestID = requestAnimationFrame(requestNewFrameDraw);
    }

    return () => {
      if (currentRequestID !== null) {
        cancelAnimationFrame(currentRequestID);
      }
    };
  }, [isPaused]);

  useImperativeHandle(ref, () => ({
    togglePlayStateInChild() {
      const newPosition: Parameters<typeof togglePlayState>[0] = [
        positions.positionX.value ?? 0,
        positions.positionY.value ?? 0,
      ];
      togglePlayState(newPosition);
    },
  }));

  const onStartGame = useEffectEvent(() => {
    startGame();
  });

  // init position and trigger start on load and on resize
  useEffect(() => {
    const width = playingFieldBoundingBox?.width;
    const height = playingFieldBoundingBox?.height;

    // bounding box is null on initial load
    if (!width || !height) {
      return;
    }

    const angleInRad = Math.random() * Math.PI * 2;

    const velocityX = Math.cos(angleInRad) * speed;
    const velocityY = Math.sin(angleInRad) * speed;

    dispatchLocal({
      type: 'TRIGGER_INITIAL_POSITION',
      payload: {
        worldSize: {
          width,
          height,
        },
        logoSize,
        velocityX,
        velocityY,
      },
    });

    onStartGame();
  }, [playingFieldBoundingBox?.width, playingFieldBoundingBox?.height]);

  return (
    <Styles.PlayingFieldWrapper
      ref={playingFieldRefCB}
      data-testid="playingfield"
      $isPaused={isPaused}
    >
      {positions.positionX.value !== null && positions.positionY.value !== null ? (
        <Logo
          positionX={positions.positionX.value}
          positionY={positions.positionY.value}
          width={logoSize[0]}
          height={logoSize[1]}
          currentColour={currentColor}
        />
      ) : null}
    </Styles.PlayingFieldWrapper>
  );
}

export default PlayingField;
