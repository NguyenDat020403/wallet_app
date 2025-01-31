import React from 'react';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import ReactNativeModal from 'react-native-modal';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {TextStyle, View, ViewStyle} from 'react-native';
import AppButton from '../AppButton';
import {StyleProp} from 'react-native';
import {IconWarning} from '@/assets/icons';

type AppDialogProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  buttonComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const AppDialog: React.FC<AppDialogProps> = ({
  isVisible,
  setIsVisible,
  title,
  titleStyle,
  buttonComponent,
  style,
  onPress,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
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
      }}
      onBackButtonPress={() => {
        setIsVisible(false);
      }}
      animationOut={'slideOutDown'}
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View style={[styles.container, style]}>
        <View style={styles.iconWarning}>
          <Image
            source={IconWarning}
            style={{
              width: 50,
              height: 50,
            }}
            containerStyle={{alignSelf: 'center'}}
          />
        </View>
        <Text style={[styles.textWarning, titleStyle]}>{title && title}</Text>
        {buttonComponent ? (
          buttonComponent
        ) : (
          <AppButton
            onPress={() => {
              onPress && onPress();
            }}
            title="Done"
            buttonStyle={styles.buttonStyle}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};

export default AppDialog;
