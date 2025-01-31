import {MainStackParamList} from '@/navigation/MainNavigation/types';
export type AuthInitialState = {
  isFirstLaunch: boolean;
  isAuthenticated: boolean;
  isShowRequireLogin: boolean;
  screenNameBeforeAuth: keyof MainStackParamList;
};
