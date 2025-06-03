import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useForm} from 'react-hook-form';
import {Image} from '@rneui/base';
import {ImageAddAvatar, ImageAvatar} from '@/features/auth/assets/images';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import ReactNativeModal from 'react-native-modal';
import {
  IconBackgroundAvatar,
  IconClose,
  IconEmoji,
  IconImage,
} from '@/assets/icons';
import {IconCamera} from '@/features/auth/assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch} from '@/redux/hooks';
import {uploadAvatar} from '@/features/auth/redux/slices';

interface CreateScreen2Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen2: React.FC<CreateScreen2Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [avatar, setAvatar] = useState<{
    uri: string | undefined;
    fileName: string | undefined;
    type: string | undefined;
  }>();
  const URL = '123123';
  console.log(avatar);
  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    const asset = result.assets?.[0];
    if (asset) {
      setAvatar({
        uri: asset.uri || '',
        fileName: asset.fileName || '',
        type: asset.type || '',
      });
    }
  };
  const handleContinue = () => {
    if (avatar) {
      const formData = new FormData();
      const a: any = {
        uri: avatar!.uri,
        name: avatar!.fileName,
        type: avatar!.type,
      };
      formData.append('file', a);
      dispatch(
        uploadAvatar({
          params: formData,
          callback: () => {
            tabIndex(2);
          },
        }),
      );
    } else {
      tabIndex(2);
    }
  };
  useEffect(() => {
    console.log(avatar?.uri);
  }, [avatar]);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{position: 'relative'}}
          onPress={() => {
            handlePickImage();
          }}>
          {avatar && (
            <Image
              source={{uri: avatar.uri}}
              style={{
                width: safeAreaInsets.screenWidth - 64,
                height: safeAreaInsets.screenWidth - 64,
                borderRadius: 300,
              }}
              containerStyle={{
                position: 'absolute',
                zIndex: -1,
                alignSelf: 'center',
                top: 16,
                left: 16,
              }}
            />
          )}
          <Image
            source={avatar ? IconBackgroundAvatar : ImageAddAvatar}
            style={{
              width: safeAreaInsets.screenWidth - 32,
              height: safeAreaInsets.screenWidth - 32,
              zIndex: -1,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.textBody3Regular}>Set your avatar</Text>
      </View>
      <Text style={[styles.textCap1, {opacity: 0.6}]}>
        You can always change your image later.
      </Text>
      <AppButton
        buttonStyle={{
          marginBottom: 16,
          opacity: URL ? 1 : 0.6,
        }}
        title="Continue"
        onPress={() => {
          handleContinue();
        }}
      />
    </View>
  );
};

export default CreateScreen2;
