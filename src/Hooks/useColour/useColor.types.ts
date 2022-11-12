import type { StoreType } from '../../Store';

export type UseColor = [
  colour: StoreType['colours'][number],
  changeColour: () => void
];
