import {View, Text} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppImage} from '@/components';
import {Image} from '../../redux/RTKQuery/types';
import {IconCopy} from '@/features/auth/assets/icons';
import {Icon} from '@rneui/base';
import {Asset} from 'react-native-image-picker';

type PostMediaViewProps = {
  resource?: Image[];
  imagesDevice?: Asset[];
};

const PostMediaView: React.FC<PostMediaViewProps> = ({
  resource,
  imagesDevice,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const MEDIA_LENGHT = resource ? resource.length : imagesDevice?.length;
  const CONTAINER_WIDTH = safeAreaInsets.screenWidth - 32;

  switch (MEDIA_LENGHT) {
    case 0:
      return <></>;
    case 1:
      return (
        <View>
          <AppImage
            source={{
              uri: resource ? resource[0].imageUrl : imagesDevice![0].uri,
            }}
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
        <View style={{flexDirection: 'row', gap: 8}}>
          <AppImage
            source={{
              uri: resource ? resource[0].imageUrl : imagesDevice![0].uri,
            }}
            style={{
              borderRadius: 12,
              width: CONTAINER_WIDTH / 2 - 4,
              height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
            }}
          />
          <AppImage
            source={{
              uri: resource ? resource[1].imageUrl : imagesDevice![1].uri,
            }}
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
        <View style={{gap: 4}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{
                uri: resource ? resource[0].imageUrl : imagesDevice![0].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
              }}
            />
            <AppImage
              source={{
                uri: resource ? resource[1].imageUrl : imagesDevice![1].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: ((CONTAINER_WIDTH / 2 - 4) / 3) * 4,
              }}
            />
          </View>
          <View style={{position: 'relative'}}>
            <AppImage
              source={{
                uri: resource ? resource[2].imageUrl : imagesDevice![2].uri,
              }}
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
        <View style={{gap: 4}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{
                uri: resource ? resource[0].imageUrl : imagesDevice![0].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <AppImage
              source={{
                uri: resource ? resource[1].imageUrl : imagesDevice![1].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{
                uri: resource ? resource[2].imageUrl : imagesDevice![2].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <AppImage
              source={{
                uri: resource ? resource[3].imageUrl : imagesDevice![3].uri,
              }}
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
        <View style={{gap: 4}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{
                uri: resource ? resource[0].imageUrl : imagesDevice![0].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <AppImage
              source={{
                uri: resource ? resource[1].imageUrl : imagesDevice![1].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{
                uri: resource ? resource[2].imageUrl : imagesDevice![2].uri,
              }}
              style={{
                borderRadius: 12,
                width: CONTAINER_WIDTH / 2 - 4,
                height: CONTAINER_WIDTH / 2 - 4,
              }}
            />
            <View style={{position: 'relative'}}>
              <AppImage
                source={{
                  uri: resource ? resource[3].imageUrl : imagesDevice![3].uri,
                }}
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
                <Icon
                  type="feather"
                  name="image"
                  iconStyle={{fontSize: 16}}
                  color={'#FFFFFF'}
                />
              </View>
            </View>
          </View>
        </View>
      );
  }
};

export default PostMediaView;
