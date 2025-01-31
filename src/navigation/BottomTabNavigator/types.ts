import {StackScreenProps} from '@react-navigation/stack';

export type HomeTabStackParamList = {
  HomeScreen: undefined;
};
export type WishListTabStackParamList = {
  HomeScreen: undefined;
};
export type CategoriesTabStackParamList = {
  HomeScreen: undefined;
};
export type CartTabStackParamList = {
  HomeScreen: undefined;
};
export type ProfileTabStackParamList = {
  HomeScreen: undefined;
};

export type AppTabStackParamList = {
  HomeTab: StackScreenProps<HomeTabStackParamList>;
  WishListTab: StackScreenProps<WishListTabStackParamList>;
  CategoriesTab: StackScreenProps<CategoriesTabStackParamList>;
  ProfileTab: StackScreenProps<ProfileTabStackParamList>;
  CartTab: StackScreenProps<CartTabStackParamList>;
};
