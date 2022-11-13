import { PropsWithChildren } from 'react';

export type SettingsProps = {
  children?: PropsWithChildren['children']; // workaround to avoid empty object
};
