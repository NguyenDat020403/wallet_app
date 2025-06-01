import {View, Text} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppImage} from '@/components';
import {Image} from '../../redux/RTKQuery/types';
import {IconCopy} from '@/features/auth/assets/icons';

type PostMediaViewProps = {
  resource: Image[];
};

const PostMediaView: React.FC<PostMediaViewProps> = ({resource}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const MEDIA_LENGHT = resource.length;
  const CONTAINER_WIDTH = safeAreaInsets.screenWidth - 32;

  switch (MEDIA_LENGHT) {
    case 0:
      return <></>;
    case 1:
      return (
        <View style={{paddingVertical: 16}}>
          <AppImage
            source={{uri: resource[0].imageUrl}}
            style={{
              width: CONTAINER_WIDTH,
              height: CONTAINER_WIDTH,
              borderRadius: 12,
            }}
          />
        </View>
      );
    case 2:
      return (
        <View style={{flexDirection: 'row', gap: 8, paddingVertical: 16}}>
          <AppImage
            source={{uri: resource[0].imageUrl}}
            style={{
              borderRadius: 12,
              width: CONTAINER_WIDTH / 2 - 4,
              height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
            }}
          />
          <AppImage
            source={{uri: resource[1].imageUrl}}
            style={{
              borderRadius: 12,
              width: CONTAINER_WIDTH / 2 - 4,
              height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
            }}
          />
        </View>
      );
    case 3:
      return (
        <View style={{gap: 4, paddingVertical: 16}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: resource[0].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
              }}
            />
            <AppImage
              source={{uri: resource[1].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
              }}
            />
          </View>
          <View style={{position: 'relative'}}>
            <AppImage
              source={{uri: resource[2].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH,
                height: undefined,
                aspectRatio: 16 / 9,
              }}
            />
          </View>
        </View>
      );
    case 4:
      return (
        <View style={{gap: 4, paddingVertical: 16}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: resource[0].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <AppImage
              source={{uri: resource[1].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: resource[0].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <AppImage
              source={{uri: resource[1].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
          </View>
        </View>
      );
    default:
      return (
        <View style={{gap: 4, paddingVertical: 16}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: resource[0].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <AppImage
              source={{uri: resource[0].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: resource[0].imageUrl}}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <View style={{position: 'relative'}}>
              <AppImage
                source={{uri: resource[0].imageUrl}}
                style={{
                  borderRadius: 12,
                  width: CONTAINER_WIDTH / 2 - 4,
                  height: CONTAINER_WIDTH / 2 - 4,
                }}
              />
              <View style={styles.imagesList} />
              <View style={styles.imageCountMore}>
                <Text style={[styles.textBody1Regular]}>
                  +{MEDIA_LENGHT - 3}
                </Text>
                <AppImage
                  source={IconCopy}
                  style={{width: 16, height: 16}}
                  haveDefault={false}
                />
              </View>
            </View>
          </View>
        </View>
      );
  }
};

export default PostMediaView;
