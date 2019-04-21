import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Playfield from './Playfield';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('Playfield', () => {
  global.context = describe;

  const wrapper = shallow(<Playfield isPaused={ false } />);

  wrapper.update();

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});