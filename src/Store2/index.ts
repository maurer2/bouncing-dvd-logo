import { create } from 'zustand';
import { sample } from 'es-toolkit';
import { devtools } from 'zustand/middleware';

const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'] as const;

type Position = [x: number, y: number];
type Colour = (typeof colours)[number];
type Colours = Set<Colour>;

type GameStartedAction = {
  type: 'GAME_STARTED';
};
type GameStoppedAction = {
  type: 'GAME_STOPPED';
  payload: Position;
};
type CollisionTriggeredAction = {
  type: 'COLLISION_TRIGGERED';
  payload: Colour;
};
type PlayStateToggledAction = {
  type: 'PLAY_STATE_TOGGLED';
};
type SoundStateToggledAction = {
  type: 'SOUND_STATE_TOGGLED';
};

type Action =
  | GameStartedAction
  | GameStoppedAction
  | CollisionTriggeredAction
  | PlayStateToggledAction
  | SoundStateToggledAction;

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
        flags: {
          ...state.flags,
          isPlayingSound: true,
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

    case 'PLAY_STATE_TOGGLED': {
      return {
        ...state,
        flags: {
          ...state.flags,
          isPaused: !state.flags.isPaused,
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

    default: {
      return action satisfies never;
    }
  }
};

export const useStore = create<Store>()(
  devtools((set) => ({
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
    dispatch: (action: Action) => set((state) => reducers(state, action), undefined, action.type), // last param for logging in dev tools
  })),
);

export const useIsPaused = () => useStore((state) => state.flags.isPaused);
export const useIsPlayingSound = () => useStore((state) => state.flags.isPlayingSound);
export const useIsSoundDisabled = () => useStore((state) => state.flags.isSoundDisabled);

export const useStartGame = () => useStore.getState().dispatch({ type: 'GAME_STARTED' });
export const useStopGame = (position: Position) =>
  useStore(() => useStore.getState().dispatch({ type: 'GAME_STOPPED', payload: position }));
export const useTriggerCollision = () => {
  const state = useStore.getState();
  const coloursWithoutCurrent = state.colours.list.difference(new Set([state.colours.current]));
  const newColour = sample(Array.from(coloursWithoutCurrent));

  return () => useStore.getState().dispatch({ type: 'COLLISION_TRIGGERED', payload: newColour });
};
export const useTogglePlayState = () =>
  useStore(() => useStore.getState().dispatch({ type: 'PLAY_STATE_TOGGLED' }));
export const useToggleSoundState = () =>
  useStore(() => useStore.getState().dispatch({ type: 'SOUND_STATE_TOGGLED' }));
