import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Game from './Game';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('Game', () => {
  const wrapper = shallow(<Game />);

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
