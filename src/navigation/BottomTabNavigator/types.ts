import {StackScreenProps} from '@react-navigation/stack';
import * as forumScreen from '@features/forum/screens';
export type ChatTabStackParamList = {
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
  ChatTab: StackScreenProps<ChatTabStackParamList>;
  HomeTab: StackScreenProps<HomeTabStackParamList>;
};
