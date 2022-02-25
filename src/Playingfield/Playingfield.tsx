import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  VFC,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash-es';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import Controls from '../Controls/Controls';
import useChangeDelta from '../Hooks/useChangeDelta';
import useCollisionDetection from '../Hooks/useCollisionDetection';

import * as Styles from './Playingfield.styles';
import * as Types from './Playingfield.types';

const PlayingField: VFC<Readonly<Types.PlayingfieldProps>> = ({ isPaused }): JSX.Element => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const loopTimestamp = useRef(0);
  const playfieldBB = useRef<DOMRect>({} as DOMRect);

  const isColliding = useRef(false);
  const isCollidingX = useRef(false);
  const isCollidingY = useRef(false);
  const isPausedPrevious = useRef(false);
  const isInit = useRef(false);

  // svg
  const widthObject = 150;
  const heightObject = 138; // AR 0,92

  const playfieldDomRefCB = useCallback((element: HTMLElement) => {
    if (element === null) {
      return;
    }

    playfieldBB.current = element.getBoundingClientRect();
  }, []);

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positionX,
    widthObject,
    playfieldBB.current.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positionY,
    heightObject,
    playfieldBB.current.height,
  );
  const [changeX] = useChangeDelta(3, isCollidingX.current);
  const [changeY] = useChangeDelta(3, isCollidingY.current);

  // set random initial position and direction
  // useEffectOnce
  const initPosition = useCallback(() => {
    if (isInit.current) {
      return;
    }

    const { width, height } = playfieldBB.current;

    setPositionX(() => random(width - widthObject));
    setPositionY(() => random(height - heightObject));

    isInit.current = true;
  }, []);

  const loop = useCallback(() => {
    if (!isPausedPrevious.current) {
      let hasCollidedX = false;
      let hasCollidedY = false;

      setPositionX((prevPositionX) => {
        if (isCollidingXStart.current || isCollidingXEnd.current) {
          hasCollidedX = true;
        }

        return Math.round(prevPositionX + changeX.current);
      });

      setPositionY((prevPositionY) => {
        if (isCollidingYStart.current || isCollidingYEnd.current) {
          hasCollidedY = true;
        }

        return Math.round(prevPositionY + changeY.current);
      });

      isColliding.current = hasCollidedX || hasCollidedY;
      isCollidingX.current = hasCollidedX;
      isCollidingY.current = hasCollidedY;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [isCollidingXStart, isCollidingXEnd, isCollidingYStart, isCollidingYEnd, changeX, changeY]);

  const startLoop = useCallback(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  function stopLoop(): void {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useLayoutEffect(() => {
    initPosition();
    startLoop();

    return () => stopLoop();
  }, [initPosition, startLoop]);

  useEffect(() => {
    isPausedPrevious.current = isPaused;
  }, [isPaused]);

  return (
    <Styles.PlayingFieldWrapper
      ref={playfieldDomRefCB}
      data-testid="playfingfield"
      data-status={isPaused ? 'inactive' : 'active'}
    >
      {isInit.current && (
        <>
          <Logo
            positionX={positionX}
            positionY={positionY}
            width={widthObject}
            height={heightObject}
            changeColours={isColliding.current}
            isPaused={isPaused}
          />
          <Controls />
          <Sound triggerSound={isColliding.current} />
        </>
      )}
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = { isPaused: bool.isRequired };

export default PlayingField;
