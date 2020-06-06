import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  FC,
} from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import Controls from '../Controls/Controls';

import * as Styles from './Playingfield.styles';
import * as Types from './Playingfield.types';

/*
const isCollidingWithBoundaries = (
  positionX, positionY, width, height, playfieldWidth, playfieldHeight,
) => {
  const leftCheck = isPastStartBoundary(positionX);
  const rightCheck = isPastEndBoundary(positionX, width, playfieldWidth);
  const topCheck = isPastStartBoundary(positionY);
  const bottomCheck = isPastEndBoundary(positionY, height, playfieldHeight);

  return [leftCheck, rightCheck, topCheck, bottomCheck].some(entry => !!entry);
};
*/

const PlayingField: FC<Types.PlayingfieldProps> = (props): JSX.Element => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const loopTimestamp = useRef(0);
  const changeDeltaX = useRef(2); // velocity x
  const changeDeltaY = useRef(2); // velocity y

  const playfieldDomElement = useRef();
  const playfieldBB = useRef({});

  const isColliding = useRef(false);
  const isPaused = useRef(false);
  const isInit = useRef(false);
  const maxRandomness = 6; // max value of deviation from correct reflection on collision

  // svg
  const width = 150;
  const height = 138; // AR 0,92

  const isPastStartBoundary = useMemo(() => (position) => (position <= 0), []);

  const isPastEndBoundary = useMemo(() => (position, objectSize, playfieldSize) => {
    const maxPositionStillInside = (playfieldSize - objectSize);

    return position >= maxPositionStillInside;
  }, []);

  // set random initial position and direction
  function initPosition() {
    const { width: widthBB, height: heightBB } = (playfieldBB as any).current;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));

    // initial direction
    changeDeltaX.current = random(1) === 0 ? changeDeltaX.current * -1 : changeDeltaX.current * +1;
    changeDeltaY.current = random(1) === 0 ? changeDeltaY.current * -1 : changeDeltaY.current * +1;
    isInit.current = true;
  }

  const updatePosition = useCallback(() => {
    const { width: widthBB, height: heightBB } = (playfieldBB as any).current;

    const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
    const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

    let newChangeDeltaX = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);
    let newChangeDeltaY = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);
    let hasCollided = false;

    setPositionX((prevPositionX) => {
      if (isPastStartBoundary(prevPositionX)) {
        newChangeDeltaX = Math.abs(changeDeltaX.current);
        hasCollided = true;
      }

      if (isPastEndBoundary(prevPositionX, width, widthBB)) {
        newChangeDeltaX = Math.abs(changeDeltaX.current) * -1;
        hasCollided = true;
      }

      return Math.round(prevPositionX + newChangeDeltaX);
    });

    setPositionY((prevPositionY) => {
      if (isPastStartBoundary(prevPositionY)) {
        newChangeDeltaY = Math.abs(changeDeltaY.current);
        hasCollided = true;
      }

      if (isPastEndBoundary(prevPositionY, height, heightBB)) {
        newChangeDeltaY = Math.abs(changeDeltaY.current) * -1;
        hasCollided = true;
      }

      return Math.round(prevPositionY + newChangeDeltaY);
    });

    if (hasCollided) {
      changeDeltaX.current = newChangeDeltaX;
      changeDeltaY.current = newChangeDeltaY;
    }

    isColliding.current = hasCollided;
  }, [isPastStartBoundary, isPastEndBoundary]);

  const loop = useCallback(() => {
    if (!isPaused.current) {
      updatePosition();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [updatePosition]);

  const startLoop = useCallback(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  function stopLoop() {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useEffect(() => {
    playfieldBB.current = (playfieldDomElement.current as HTMLElement).getBoundingClientRect();

    initPosition();
    startLoop();

    return () => stopLoop();
  }, [startLoop]);

  useEffect(() => {
    const currentPlayState = props.isPaused;

    isPaused.current = currentPlayState;
  }, [props.isPaused]);

  return (
    <Styles.PlayingFieldWrapper ref={playfieldDomElement}>
      {isInit.current && (
        <>
          <Logo
            positionX={positionX}
            positionY={positionY}
            width={width}
            height={height}
            changeColours={isColliding.current}
            isPaused={props.isPaused}
          />
          <Controls />
          <Sound playSound={isColliding.current} />
        </>
      )}
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = { isPaused: bool.isRequired };

export default PlayingField;
