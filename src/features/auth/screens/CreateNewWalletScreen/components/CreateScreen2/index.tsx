import React, {useState} from 'react';
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
    uri: string;
    fileName: string;
    type: string;
  }>();
  const URL = '123123';
  const handleContinue = () => {
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
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textBody3Regular}>Set a Display Image</Text>
        <Text style={[styles.textBody3Regular, {opacity: 0.6}]}>
          Let’s choose an avatar for your wallet. This is visible only to you.
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{position: 'relative'}}
        onPress={() => {
          setIsVisible(true);
        }}>
        {avatar && (
          <Image
            source={IconBackgroundAvatar}
            style={{
              width: safeAreaInsets.screenWidth - 28,
              height: safeAreaInsets.screenWidth - 28,
            }}
            containerStyle={{
              alignSelf: 'center',
              position: 'absolute',
              top: -16,
            }}
          />
        )}
        <Image
          source={avatar ? {uri: avatar.uri} : ImageAddAvatar}
          style={{
            width: safeAreaInsets.screenWidth - 64,
            height: safeAreaInsets.screenWidth - 64,
            borderRadius: 300,
          }}
          containerStyle={{alignSelf: 'center'}}
        />
      </TouchableOpacity>

      <Text style={[styles.textCap1, {opacity: 0.6}]}>
        You can always change your image later.
      </Text>
      <AppButton
        buttonStyle={{
          marginBottom: 16,
          opacity: URL ? 1 : 0.6,
        }}
        title="Continue"
        disable={!URL}
        onPress={() => {
          handleContinue();
        }}
      />
      <BottomSelectedModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setImage={setAvatar}
      />
    </View>
  );
};

export default CreateScreen2;

type BottomSelectedModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
};

const BottomSelectedModal: React.FC<BottomSelectedModalProps> = ({
  isVisible,
  setIsVisible,
  setImage,
}) => {
  const styles = useStyles();
  const ListOption = [
    {
      icon: IconCamera,
      title: 'Take Photo',
      onPress: () => {
        //open camera
      },
    },
    {
      icon: IconImage,
      title: 'Choose image',
      onPress: async () => {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          includeBase64: false,
        });
        const asset = result.assets?.[0];
        if (asset) {
          setImage(asset);
        }
      },
    },
    {icon: IconEmoji, title: 'Use emoji'},
  ];

  return (
    <ReactNativeModal
      coverScreen={false}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomModal}>
          <Text style={styles.textBody3Regular}>Select Icon</Text>
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.8}
            style={styles.closeButton}
            onPress={() => {
              setIsVisible(false);
            }}>
            <Image source={IconClose} style={styles.iconClose} />
          </TouchableOpacity>
        </View>
        {ListOption.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                item.onPress && item.onPress();
                // setImage(ImageAvatar);
                setIsVisible(false);
              }}
              activeOpacity={0.8}
              style={styles.itemBottomModal}>
              <Image source={item.icon} style={{width: 24, height: 24}} />
              <Text style={styles.textBody1Medium}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ReactNativeModal>
  );
};
