import {StackScreenProps} from '@react-navigation/stack';
import * as forumScreen from '@features/forum/screens';
export type HistoryTabStackParamList = {
  HomeScreen: undefined;
};
export type PostTabStackParamList = {
  PostScreen: undefined;
};
export type HomeTabStackParamList = {
  HomeScreen: undefined;
};

export type AppTabStackParamList = {
  PostTab: StackScreenProps<PostTabStackParamList>;
  HistoryTab: StackScreenProps<HistoryTabStackParamList>;
  HomeTab: StackScreenProps<HomeTabStackParamList>;
};
