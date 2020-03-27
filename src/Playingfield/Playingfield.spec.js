import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import PlayingField from './Playingfield';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('PlayingField', () => {
  const subscribeMock = jest.fn();
  const unsubscribeMock = jest.fn();

  const context = {
    loop: {
      subscribe: subscribeMock,
      unsubscribe: unsubscribeMock,
    },
  };

  const wrapper = shallow(<PlayingField isPaused={ false } />, { context });

  wrapper.update();

  test('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should call loop.subscribe', () => {
    expect(subscribeMock).toBeCalled();
  });

  test('should call loop.unsubscribe', () => {
    wrapper.unmount();
    expect(unsubscribeMock).toBeCalled();
  });
});
