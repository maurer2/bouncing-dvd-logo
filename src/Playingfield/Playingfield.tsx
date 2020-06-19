import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  FC,
  useLayoutEffect,
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
  const playfieldBB = useRef<ClientRect>({} as ClientRect);

  const isColliding = useRef(false);
  const isCollidingX = useRef(false);
  const isCollidingY = useRef(false);
  const isPausedPrevious = useRef(false);
  const isInit = useRef(false);

  // svg
  const width = 150;
  const height = 138; // AR 0,92

  /*
  const worldSize = useMemo(() => {
    const { width, height } = playfieldBB.current;
    return [width, height];
  }, [playfieldBB.current]);
  */

  const playfieldDomRefCB = useCallback((element: HTMLElement) => {
    if (element === null) {
      return;
    }

    const elementBB: ClientRect = element.getBoundingClientRect();

    playfieldBB.current = elementBB;
  }, []);

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(positionX, width, playfieldBB.current.width);
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(positionY, height, playfieldBB.current.height);
  const [changeX] = useChangeDelta(2, isCollidingX.current);
  const [changeY] = useChangeDelta(2, isCollidingY.current);

  // set random initial position and direction
  // useEffectOnce
  const initPosition = useCallback(() => {
    if (isInit.current) {
      return;
    }

    const { width: widthBB, height: heightBB } = playfieldBB.current;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));

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

  useEffect(() => {
    if (isCollidingYStart.current || isCollidingYEnd.current || isCollidingXStart.current || isCollidingXEnd.current) {
      // console.log('collision');
    }
  });

  const startLoop = useCallback(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  function stopLoop() {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useLayoutEffect(() => {
    initPosition();
    startLoop();

    return () => stopLoop();
  }, [initPosition, startLoop]);

  useEffect(() => {
    const currentPlayState = isPaused;

    isPausedPrevious.current = currentPlayState;
  }, [isPaused]);

  // console.log('change X', (changeX.current > 0));
  // console.log('change Y', (changeY.current > 0));

  return (
    <Styles.PlayingFieldWrapper ref={playfieldDomRefCB}>
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
