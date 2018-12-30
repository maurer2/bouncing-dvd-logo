import React from 'react';
import PropTypes from 'prop-types';
import './Logo.css';
import { ReactComponent as CatSVG } from './cat.svg';

const Logo = ({
  positionX, positionY, width, color,
}) => {
  const getStyle = () => ({
    transform: `translate(${positionX}px, ${positionY}px)`,
    width: `${width}px`,
    color: `${color}`,
  });

  return (
    <CatSVG className="logo" style= { getStyle() } />
  );
};

Logo.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default Logo;
