import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Loop2 = (props) => {
  const [count, setCount] = React.useState(1);

  const triggerUpdate = useRef(false);
  const prevTriggerUpdate = useRef(false);

  const frameRate = 60;

  /*
  const calculateLoop = () => {
    frameCounter.current = (frameCounter.current % frameRate === 0) ? 1 : frameCounter.current + 1;

    prevTriggerUpdate.current = triggerUpdate.current;
    triggerUpdate.current = (frameCounter.current === 1);

    if (triggerUpdate.current && triggerUpdate.current !== prevTriggerUpdate.current) {
      triggerUpdate.current = true;
    }
  };
  */

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((currentCount) => {
        const newCount = (currentCount % 60 === 0) ? 1 : currentCount + 1;

        return newCount;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // const childrenWithProps = React.Children.map(props.children, child => React.cloneElement(child, { count: count }));

  // return <div>{childrenWithProps}</div>

  return (
    <React.Fragment>
      <div>
        { props.children }
      </div>
    </React.Fragment>
  );
};

Loop2.propTypes = {

};

export default Loop2;
