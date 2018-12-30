import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Logo.css';
import { ReactComponent as CatSVG } from './cat.svg';

class Logo extends Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
  }

  getStyle() {
    return {
      transform: `translate(${this.props.positionX}px, ${this.props.positionY}px)`,
      width: `${this.props.width}px`,
      color: `${this.props.color}`,
    };
  }

  render() {
    return (
      <CatSVG className="logo" style= { this.getStyle() } />
    );
  }
}

Logo.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default Logo;
