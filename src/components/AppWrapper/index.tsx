import React, {PropsWithChildren} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import useStyles from './styles';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

type AppWrapperProps = PropsWithChildren<{
  type?: 'AUTH' | 'MAIN';
  isSafe?: boolean;
  isWithout?: boolean;
  isSafeBottom?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  onPressWithoutFeedback?: () => void;
}>;

const AppWrapper: React.FC<AppWrapperProps> = ({
  type = 'MAIN',
  children,
  isSafe = true,
  isWithout = false,
  style,
  isSafeBottom = true,
  isLoading = false,
  onPressWithoutFeedback,
}) => {
  const styles = useStyles();
  const insets = useSafeAreaInsetsWindowDimension();
  const renderContent = () => {
    if (isSafe && isWithout) {
      return (
        <TouchableWithoutFeedback
          style={[{height: '100%'}, {paddingTop: insets.top}]}
          onPress={onPressWithoutFeedback}>
          <View
            style={[
              styles.container,
              isSafeBottom && {paddingBottom: insets.bottom},
              style,
            ]}>
            <>{children}</>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    if (isSafe && !isWithout) {
      return (
        <SafeAreaView
          style={[
            styles.container,
            !isSafeBottom && {paddingBottom: -insets.bottom},
            style,
          ]}>
          {children}
        </SafeAreaView>
      );
    }
    return <View style={[styles.container, style]}>{children}</View>;
  };

  return <View style={[styles.container, style]}>{renderContent()}</View>;
};

export default AppWrapper;
