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

  let defaultSource;
  if (type === 'AVATAR') {
    defaultSource = ImageError;
  } else {
    defaultSource = ImageAvatar;
  }
  return (
    <View style={[style, {overflow: 'hidden'}]}>
      <FastImage
        {...props}
        style={[styles.image, type === 'AVATAR' && {borderRadius: 150}]}
      />
      {haveDefault && (
        <FastImage
          resizeMode="stretch"
          source={ImageError}
          style={[
            styles.imageDefault,
            type === 'AVATAR' && {borderRadius: 150},
          ]}
        />
      )}
    </View>
  );
};

export default AppImage;
