import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';

import Component from './Controls';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(<Component />);
  await expect(component).toContainText('Learn React');
});
