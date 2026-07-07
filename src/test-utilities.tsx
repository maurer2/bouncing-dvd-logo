import React, { type ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'vitest-browser-react';

import { theme } from './Theme/tokens';

// https://github.com/testing-library/react-testing-library/issues/780#issuecomment-687525893
export const renderStyledComponents = (
  ui: ReactElement,
  options?: Parameters<typeof render>[1],
): ReturnType<typeof render> =>
  render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    ...options,
  });
