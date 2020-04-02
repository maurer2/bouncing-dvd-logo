import React from 'react';

import * as Styles from './Controls.styles';

const Controls = () => {
  const handleClick = () => {
    console.log('handleClick');
  };

  return (
    <div>
      <div onClick={handleClick}>Click</div>
    </div>
  );
};

export default Controls;
