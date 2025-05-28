import React from 'react';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import ReactNativeModal from 'react-native-modal';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {TextStyle, View, ViewStyle} from 'react-native';
import AppButton from '../AppButton';
import {StyleProp} from 'react-native';
import {IconSuccess, IconWarning} from '@/assets/icons';

type AppDialogProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onPress: () => void;
  onPressBackground?: () => void;
  titleButton?: string;
  action?: 'WARNING' | 'SUCCESS';
  titleStyle?: StyleProp<TextStyle>;
  buttonComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  desc?: string;
  descStyle?: StyleProp<TextStyle>;
};

const AppDialog: React.FC<AppDialogProps> = ({
  isVisible,
  setIsVisible,
  title,
  action = 'SUCCESS',
  titleStyle,
  onPressBackground,
  buttonComponent,
  titleButton,
  desc,
  descStyle,
  style,
  onPress,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const icon = action === 'SUCCESS' ? IconSuccess : IconWarning;
  return (
    <ReactNativeModal
      deviceHeight={safeAreaInsets.screenHeight}
      statusBarTranslucent
      isVisible={isVisible}
      backdropColor={'black'}
      backdropOpacity={0.9}
      useNativeDriver
      useNativeDriverForBackdrop
      coverScreen={true}
      onBackdropPress={() => {
        setIsVisible(false);
        onPressBackground && onPressBackground();
      }}
      onBackButtonPress={() => {
        setIsVisible(false);
        onPressBackground && onPressBackground();
      }}
      animationOut={'slideOutDown'}
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View style={[styles.container, style]}>
        <Image source={icon} style={{width: 200, height: 200}} />
        <Text style={[styles.textBody3Regular, titleStyle]}>
          {title && title}
        </Text>
        <Text style={[styles.textBody2Regular, descStyle]}>{desc && desc}</Text>
        {buttonComponent ? (
          buttonComponent
        ) : (
          <AppButton
            onPress={() => {
              onPress && onPress();
              setIsVisible(false);
            }}
            title={titleButton ? titleButton : 'Cancel'}
            buttonStyle={styles.buttonStyle}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};

export default AppDialog;
