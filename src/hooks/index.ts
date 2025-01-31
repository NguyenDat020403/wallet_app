import {ScreenHeight, ScreenWidth} from '@rneui/base';
import {Dimensions, Platform} from 'react-native';
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

export const useSafeAreaInsetsWindowDimension = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const heightFrame =
    initialWindowMetrics?.frame.height ||
    ScreenHeight + safeAreaInsets.top + safeAreaInsets.bottom;
  const screenHeight = Platform.OS === 'ios' ? ScreenHeight : heightFrame;
  return {screenHeight, screenWidth: ScreenWidth, ...safeAreaInsets};
};
