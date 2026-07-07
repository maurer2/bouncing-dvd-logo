import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize/modern-normalize.css'; // todo: move to global CSS in correct layer

import Game from './Game/Game';
import { Theme } from './Theme/Theme';

export function App() {
  return (
    <StrictMode>
      <Theme>
        <Game />
      </Theme>
    </StrictMode>
  );
}

const container = document.querySelector('#root');
if (!container) {
  throw new Error('root element not found');
}

const root = createRoot(container);
root.render(<App />);
