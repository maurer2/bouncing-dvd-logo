import type { StoreType } from '../../Store';

export type UseColour = [
  colour: StoreType['colours'][number],
  changeColour: () => void
];
