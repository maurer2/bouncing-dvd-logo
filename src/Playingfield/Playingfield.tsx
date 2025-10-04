import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useReducer,
  useEffect,
  useState,
  useEffectEvent,
  type FC,
} from 'react';
import { random } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Logo/Logo';
import useCollisionDetection from '../Hooks/useCollisionDetection';
import {
  startGame,
  triggerCollision,
  triggerCollisionEnd,
  // setLastPosition,
} from '../Store/actionCreators';
import { getPlayState, getCurrentColour } from '../Store/selectors';

import * as Styles from './Playingfield.styles';
import { reducers } from './reducers';

type PlayingfieldProps = Record<string, never>;

const logoSize: [width: number, height: number] = [150, 138.66];
const totalVelocity = 8;
const minVelocityPerAxis = 2;

const getInverseVelocity = (currentVelocity: number, maxRandomness = 10): number => {
  // prettier-ignore
  const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
  // prettier-ignore
  const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);
  const newInverseVelocity =
    currentVelocity * random(lowerRandomBound, upperRandomBound, true) * -1;

  return newInverseVelocity;
};

const PlayingField: FC<PlayingfieldProps> = () => {
  const dispatch = useDispatch();
  const isPaused = useSelector(getPlayState);
  const loopTimestamp = useRef(0);
  const currentColor = useSelector(getCurrentColour);

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
  const [playingfieldBoundingBox, setPlayingfieldBoundingBox] = useState<DOMRectReadOnly | null>(
    null,
  );
  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positions.positionX.value,
    logoSize[0],
    playingfieldBoundingBox?.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoSize[1],
    playingfieldBoundingBox?.height,
  );

  // https://tkdodo.eu/blog/ref-callbacks-react-19-and-the-compiler#react-19
  const playfieldCBRef = useCallback((element: HTMLDivElement) => {
    const observer = new ResizeObserver((entries) => {
      const { contentRect } = entries[0];

      setPlayingfieldBoundingBox(contentRect);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const onStartGame = useEffectEvent(() => {
    dispatch(startGame());
  });

  // not used anywhere
  // const onPauseGame = useEffectEvent(() => {
  //   if (positions.positionX.value === null || positions.positionY.value === null) {
  //     return;
  //   }

  //   dispatch(setLastPosition([positions.positionX.value, positions.positionY.value]));
  // });

  const triggerHasCollided = useCallback(() => {
    dispatch(triggerCollision());
    // todo replace with redux thunk
    setTimeout(() => {
      dispatch(triggerCollisionEnd());
    }, 800);
  }, [dispatch]);

  const loop = useCallback(() => {
    if (isPaused) {
      return;
    }

    if (positions.positionX.velocity && positions.positionY.velocity) {
      if (isCollidingXStart || isCollidingXEnd) {
        triggerHasCollided();
        dispatchLocal({
          type: 'TRIGGER_X_COLLISION',
          payload: getInverseVelocity(positions.positionX.velocity),
        });
      }

      if (isCollidingYStart || isCollidingYEnd) {
        triggerHasCollided();
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
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [
    isPaused,
    isCollidingXStart,
    isCollidingYStart,
    isCollidingXEnd,
    isCollidingYEnd,
    positions.positionX.velocity,
    positions.positionY.velocity,
    triggerHasCollided,
  ]);

  useLayoutEffect(() => {
    loopTimestamp.current = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopTimestamp.current);
    };
  }, [loop]);
  // set last position when entering pause mode
  // useEffect(() => {
  //   if (!isPaused || positions.positionX.value === null || positions.positionY.value === null) {
  //     return;
  //   }
  //   onPauseGame();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps useEffectEvent not supported yet
  // }, [isPaused, positions.positionX.value, positions.positionY.value]);

  // init position and trigger start on load and on resize
  useEffect(() => {
    const width = playingfieldBoundingBox?.width;
    const height = playingfieldBoundingBox?.height;

    // bounding box is null on initial load
    if (!width || !height) {
      return;
    }

    const velocityX =
      Math.random() >= 0.5
        ? random(minVelocityPerAxis, totalVelocity - minVelocityPerAxis, true)
        : random(-minVelocityPerAxis, -totalVelocity + minVelocityPerAxis, true);
    const velocityY =
      Math.sign(velocityX) === 1 ? totalVelocity - velocityX : (totalVelocity + velocityX) * -1;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps useEffectEvent not supported yet
  }, [playingfieldBoundingBox?.width, playingfieldBoundingBox?.height]);

  return (
    <Styles.PlayingFieldWrapper
      ref={playfieldCBRef}
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
};

export default PlayingField;
