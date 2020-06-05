import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Sound from './Sound';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('Sound', () => {
  const wrapper = shallow(<Sound playSound={false} />);

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ playSound: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
