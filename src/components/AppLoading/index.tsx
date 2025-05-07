import React from 'react';
import {Overlay} from '@rneui/themed';
import useStyles from './styles';
import AnimatedLottieView from 'lottie-react-native';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Modal} from 'react-native';
import LottieView from 'lottie-react-native';

type AppLoadingProps = {
  isVisible: boolean;
  overlayStyle?: StyleProp<ViewStyle>;
};
const AppLoading: React.FC<AppLoadingProps> = ({isVisible, overlayStyle}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const renderModalComponent: any = (props: any) => (
    <Modal {...props} transparent statusBarTranslucent />
  );

  return (
    <Overlay
      isVisible={isVisible}
      ModalComponent={renderModalComponent}
      overlayStyle={[styles.container, overlayStyle]}>
      <LottieView
        source={{
          uri: 'https://lottie.host/5cef0fa3-8cbd-4939-a228-8731b1c1b67e/BOK7myeTFB.lottie',
        }}
        autoPlay
        loop
        style={styles.lottie}
      />
    </Overlay>
  );
};

export default AppLoading;
