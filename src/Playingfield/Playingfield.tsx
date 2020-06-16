import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  FC,
} from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import Controls from '../Controls/Controls';
import useChangeDelta from '../Hooks/useChangeDelta';
import useCollisionDetection from '../Hooks/useCollisionDetection';

import * as Styles from './Playingfield.styles';
import * as Types from './Playingfield.types';

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = ({ isPaused }): JSX.Element => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const loopTimestamp = useRef(0);
  const changeDeltaX = useRef(2); // velocity x
  const changeDeltaY = useRef(2); // velocity y

  const playfieldDomElement = useRef();
  const playfieldBB = useRef<ClientRect>({} as ClientRect);

  const isColliding = useRef(false);
  const isPausedPrevious = useRef(false);
  const isInit = useRef(false);
  const maxRandomness = 6; // max value of deviation from correct reflection on collision

  const [changeX, changeY] = useChangeDelta(isColliding.current);

  // svg
  const width = 150;
  const height = 138; // AR 0,92

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(positionX, width, playfieldBB.current.width);
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(positionY, height, playfieldBB.current.height);

  // set random initial position and direction
  // useEffectOnce
  const initPosition = useCallback(() => {
    if (isInit.current) {
      return;
    }

    const { width: widthBB, height: heightBB } = playfieldBB.current;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));

    // initial direction
    changeDeltaX.current = changeX.current;
    changeDeltaY.current = changeY.current;

    isInit.current = true;
  }, [changeX, changeY]);

  function updatePosition() {
    // const { width: widthBB, height: heightBB } = playfieldBB.current;

    const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
    const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

    let newChangeDeltaX = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);
    let newChangeDeltaY = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);
    // let newChangeDeltaX = changeX.current;
    // let newChangeDeltaY = changeY.current;
    let hasCollided = false;

    setPositionX((prevPositionX) => {
      if (isCollidingXStart.current) {
        newChangeDeltaX = Math.abs(changeDeltaX.current);
        hasCollided = true;
      }

      if (isCollidingXEnd.current) {
        newChangeDeltaX = Math.abs(changeDeltaX.current) * -1;
        hasCollided = true;
      }

      return Math.round(prevPositionX + newChangeDeltaX);
    });

    setPositionY((prevPositionY) => {
      if (isCollidingYStart.current) {
        newChangeDeltaY = Math.abs(changeDeltaY.current);
        hasCollided = true;
      }

      if (isCollidingYEnd.current) {
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
  }

  const loop = useCallback(() => {
    if (!isPausedPrevious.current) {
      updatePosition();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, []);

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
  }, [initPosition, startLoop]);

  useEffect(() => {
    const currentPlayState = isPaused;

    isPausedPrevious.current = currentPlayState;
  }, [isPaused]);

  // console.log('change', changeX);

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
            isPaused={isPaused}
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
