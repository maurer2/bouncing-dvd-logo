import React, { type ReactElement } from 'react';
import { render } from 'vitest-browser-react';
import { ThemeProvider } from 'styled-components';

import { theme } from './Theme';

// https://github.com/testing-library/react-testing-library/issues/780#issuecomment-687525893
export const renderStyledComponents = async (
  ui: ReactElement,
  options?: Parameters<typeof render>[1],
) =>
  render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    ...options,
  });
