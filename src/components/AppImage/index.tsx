import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import useStyles from './styles';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import {ImageError} from '@/assets/images';
import {ImageAvatar} from '@/features/auth/assets/images';

type AppImageProps = FastImageProps & {
  avatarText?: string;
  containerAvatarTextStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  style?: StyleProp<ImageStyle>;
  haveDefault?: boolean;
  type?: 'AVATAR' | 'IMAGE';
};
const AppImage: React.FC<AppImageProps> = ({
  style,
  avatarText = '',
  containerAvatarTextStyle,
  onPress,
  type,
  haveDefault = true,
  ...props
}) => {
  const styles = useStyles();

  return (
    <View style={[style, {overflow: 'hidden'}]}>
      <FastImage {...props} style={styles.image} />
      {haveDefault && (
        <FastImage
          resizeMode="stretch"
          source={ImageError}
          style={[styles.imageDefault]}
        />
      )}
    </View>
  );
};

export default AppImage;
