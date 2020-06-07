import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Logo from './Logo';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('Logo', () => {
  const wrapper = shallow(<Logo
    positionX={0}
    positionY={0}
    width={100}
    height={100}
    colours={['red', 'green', 'blue']}
    changeColours
  />);

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
