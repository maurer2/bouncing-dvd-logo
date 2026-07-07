import { sample } from 'es-toolkit';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { accentColourNames as colours } from '../Theme/tokens';

type Position = [x: number, y: number];
type Colour = (typeof colours)[number];
type Colours = Set<Colour>;

type Action =
  | {
      type: 'GAME_STARTED';
    }
  | {
      type: 'GAME_STOPPED';
      payload: Position;
    }
  | {
      type: 'COLLISION_TRIGGERED';
      payload: Colour;
    }
  | {
      type: 'PLAY_STATE_TOGGLED';
      payload: Position;
    }
  | {
      type: 'SOUND_STATE_TOGGLED';
    }
  | {
      type: 'SOUND_STARTED';
    }
  | {
      type: 'SOUND_STOPPED';
    };

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
  dispatch: (action: Action) => void;
};

type StoreActions = {
  startGame: () => void;
  stopGame: (position: Position) => void;
  triggerCollision: () => void;
  togglePlayState: (position: Position) => void;
  toggleSoundState: () => void;
};

const reducers = (state: Store, action: Action): Store => {
  switch (action.type) {
    case 'GAME_STARTED': {
      return {
        ...state,
        flags: {
          ...state.flags,
          isPaused: false,
        },
      };
    }
    case 'GAME_STOPPED': {
      const newPosition = action.payload;

      return {
        ...state,
        flags: {
          ...state.flags,
          isPaused: true,
        },
        position: {
          lastPosition: newPosition,
        },
      };
    }
    case 'COLLISION_TRIGGERED': {
      const newColour = action.payload;

      return {
        ...state,
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
    case 'PLAY_STATE_TOGGLED': {
      const newPosition = action.payload;

      return {
        ...state,
        flags: {
          ...state.flags,
          isPaused: !state.flags.isPaused,
        },
        position: {
          lastPosition: newPosition,
        },
      };
    }
    case 'SOUND_STATE_TOGGLED': {
      return {
        ...state,
        flags: {
          ...state.flags,
          isSoundDisabled: !state.flags.isSoundDisabled,
        },
      };
    }
    case 'SOUND_STARTED': {
      return {
        ...state,
        flags: {
          ...state.flags,
          isPlayingSound: true,
        },
      };
    }
    case 'SOUND_STOPPED': {
      return {
        ...state,
        flags: {
          ...state.flags,
          isPlayingSound: false,
        },
      };
    }

    default: {
      return action satisfies never;
    }
  }
};

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      position: {
        lastPosition: null,
      },
      colours: {
        current: 'white',
        previous: null,
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
      dispatch: (action: Action): void => {
        set((state) => reducers(state, action), undefined, action); // last param for logging in dev tools
      },
    }),
    { serialize: { options: true } }, // correctly display sets and maps in redux dev tools, https://github.com/reduxjs/redux-devtools/issues/496
  ),
);

export const useIsPaused = (): Store['flags']['isPaused'] =>
  useStore((state) => state.flags.isPaused);
export const useIsPlayingSound = (): Store['flags']['isPlayingSound'] =>
  useStore((state) => state.flags.isPlayingSound);
export const useIsSoundDisabled = (): Store['flags']['isSoundDisabled'] =>
  useStore((state): boolean => state.flags.isSoundDisabled);
export const useCurrentColour = (): Store['colours']['current'] =>
  useStore((state) => state.colours.current);

export const useStoreActions = (): StoreActions => ({
  startGame: (): void => {
    useStore.getState().dispatch({ type: 'GAME_STARTED' });
  },
  stopGame: (position: Position): void => {
    useStore.getState().dispatch({ type: 'GAME_STOPPED', payload: position });
  },
  triggerCollision: (): void => {
    const {
      colours: { list, current },
      flags: { isPlayingSound, isSoundDisabled },
    } = useStore.getState();
    const coloursWithoutCurrent = list.difference(new Set([current]));
    const newColour = sample(Array.from(coloursWithoutCurrent));

    useStore.getState().dispatch({ type: 'COLLISION_TRIGGERED', payload: newColour });

    if (!isSoundDisabled && !isPlayingSound) {
      useStore.getState().dispatch({ type: 'SOUND_STARTED' });

      setTimeout(() => {
        useStore.getState().dispatch({ type: 'SOUND_STOPPED' });
      }, 750);
    }
  },
  togglePlayState: (position: Position): void => {
    useStore.getState().dispatch({ type: 'PLAY_STATE_TOGGLED', payload: position });
  },
  toggleSoundState: (): void => {
    useStore.getState().dispatch({ type: 'SOUND_STATE_TOGGLED' });
  },
});
