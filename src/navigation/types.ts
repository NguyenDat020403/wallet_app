import type {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from './MainNavigation/types';

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, T>;

export type ScreenComponent = React.ComponentType<{}>;
