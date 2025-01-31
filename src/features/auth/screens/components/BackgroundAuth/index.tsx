import React from 'react';
import {Image} from '@rneui/themed';
import {BackgroundAuth, BackgroundAuth2} from '@/assets/icons';
import {ScreenWidth} from '@rneui/base';
import {StyleProp, View, ViewStyle} from 'react-native';

type BackgroundAuthenticationProps = {
  item1Style?: StyleProp<ViewStyle>;
  item2Style?: StyleProp<ViewStyle>;
};

const BackgroundAuthentication: React.FC<BackgroundAuthenticationProps> = ({
  item1Style,
  item2Style,
}) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}>
      <Image
        source={BackgroundAuth}
        style={{
          width: (ScreenWidth / 3) * 2,
          height: (ScreenWidth / 3) * 2,
          resizeMode: 'stretch',
        }}
        containerStyle={[
          {
            position: 'absolute',
            right: -(ScreenWidth / 3),
            top: ScreenWidth / 3,
            zIndex: 10,
          },
          item1Style,
        ]}
      />
      <Image
        source={BackgroundAuth2}
        style={{
          width: (ScreenWidth / 3) * 2,
          height: (ScreenWidth / 3) * 2,
          resizeMode: 'stretch',
        }}
        containerStyle={[
          item2Style,
          {
            position: 'absolute',
            left: -(ScreenWidth / 3),
            top: 0,
            zIndex: 8,
          },
        ]}
      />
    </View>
  );
};

export default BackgroundAuthentication;
