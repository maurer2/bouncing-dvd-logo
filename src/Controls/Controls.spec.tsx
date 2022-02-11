/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Store from '../Store';

import Component from './Controls';

describe('Components', () => {
  const storeValues = {
    colours: ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'],
    soundIsDisabled: true,
    toggleSound: jest.fn(),
  };

  // const CustomProvider = ({ children }) => (
  //   <Store.Provider value={storeValues}>
  //     {children}
  //   </Store.Provider>
  // );

  const setup = (props) => render(
    <Store.Provider value={storeValues}>
      <Component {...props} />
    </Store.Provider>,
  );

  it('should render ', () => {
    const { findByTestId } = setup({});

    // expect(container.innerHTML).toBe(true);
    expect(findByTestId('controls')).toBe(true);
    expect(findByTestId('controls')).toBeInTheDocument();
  });
});
