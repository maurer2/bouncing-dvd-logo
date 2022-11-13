import { createContext } from 'react';

import type { StoreType } from './types';

const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] as const;

const Store = createContext<StoreType | null>(null);

export default Store;
export { colours };
