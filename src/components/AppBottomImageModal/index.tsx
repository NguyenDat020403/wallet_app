import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import React, {SetStateAction} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import useStyles from './styles';
import {launchImageLibrary} from 'react-native-image-picker';

type AppBottomImageModalProps = {
  onPress?: () => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  setImageUrl?: React.Dispatch<SetStateAction<string>>;
};

const AppBottomImageModal: React.FC<AppBottomImageModalProps> = React.memo(
  ({onPress, isVisible, setIsVisible, setImageUrl}) => {
    const safeAreaInsets = useSafeAreaInsetsWindowDimension();
    const styles = useStyles(safeAreaInsets);

    const selectAvatar = async () => {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        return;
      }

      const asset = result.assets?.[0];

      if (asset) {
        console.log('Chọn ảnh:', asset);
      }
    };
    return <View style={styles.container}></View>;
  },
);
export default AppBottomImageModal;
