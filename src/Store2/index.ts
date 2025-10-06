import { create } from 'zustand';
import { sample } from 'es-toolkit';

const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] as const;

type Position = [x: number, y: number];
type Colour = (typeof colours)[number];
type Colours = Set<Colour>;

type StartGameAction = {
  type: 'START_GAME';
};

type TriggerCollisionAction = {
  type: 'TRIGGER_COLLISION';
  payload: Colour;
};

type Action = StartGameAction | TriggerCollisionAction;

type Store = {
  position: {
    lastPosition: Position | null;
  };
  colours: {
    current: Colour;
    previous: Colour | null;
    list: Colours;
  };
  flags: {
    isPaused: boolean;
    isPlayingSound: boolean;
    isSoundDisabled: boolean;
  };
  stats: {
    collisionCount: number;
  };
  dispatch: (args: Action) => void;
};

// https://github.com/pmndrs/zustand?tab=readme-ov-file#cant-live-without-redux-like-reducers-and-action-types
const reducers = (state: Store, action: Action): Store => {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...state,
        flags: {
          ...state.flags,
          isPaused: false,
        },
      };
    }
    case 'TRIGGER_COLLISION': {
      const coloursWithoutCurrent = state.colours.list.difference(new Set([state.colours.current]));
      const newColour = sample(Array.from(coloursWithoutCurrent));

      return {
        ...state,
        flags: {
          ...state.flags,
          isPlayingSound: true, // todo timeout
        },
        colours: {
          ...state.colours,
          current: newColour,
          previous: state.colours.current,
        },
        stats: {
          collisionCount: state.stats.collisionCount + 1,
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const useStore = create<Store>((set) => ({
  position: {
    lastPosition: null,
  },
  colours: {
    current: 'white',
    previous: null,
    // https://zustand.docs.pmnd.rs/guides/maps-and-sets-usage
    list: new Set(colours),
  },
  flags: {
    isPaused: true,
    isPlayingSound: false,
    isSoundDisabled: true,
  },
  stats: {
    collisionCount: 0,
  },
  dispatch: (args: Action) => set((state) => reducers(state, args)),
}));

export const dispatch = useStore((state) => state.dispatch);

// dispatch({ type: 'START_GAME', payload: 'meow'}) // test
// dispatch({ type: 'TRIGGER_COLLISION', payload: 'blue'})
