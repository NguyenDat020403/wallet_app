import {StackScreenProps} from '@react-navigation/stack';

export type HistoryTabStackParamList = {
  HomeScreen: undefined;
};
export type ProfileTabStackParamList = {
  HomeScreen: undefined;
};
export type SearchTabStackParamList = {
  HomeScreen: undefined;
};

export type AppTabStackParamList = {
  ProfileTab: StackScreenProps<ProfileTabStackParamList>;
  HistoryTab: StackScreenProps<HistoryTabStackParamList>;
  SearchTab: StackScreenProps<SearchTabStackParamList>;
};
