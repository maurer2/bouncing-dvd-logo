import { createContext } from 'react';

const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] as const;
type Colours = typeof colours[number]

type StoreType = {
  colours: Colours[],
  soundIsDisabled: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  toggleSound: () => void,
}

const Store = createContext<StoreType | null>(null);

export default Store;
export {
  colours,
};
