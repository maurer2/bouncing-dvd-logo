import { createContext } from 'react';

const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] as const;
type Colours = typeof colours[number];

export type StoreType = {
  colours: Colours[];
  soundIsDisabled: boolean;
  toggleSound: () => void;
};

const Store = createContext<StoreType | null>(null);

export default Store;
export {
  colours,
};
