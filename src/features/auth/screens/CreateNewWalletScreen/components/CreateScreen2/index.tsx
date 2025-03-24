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

interface CreateScreen2Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen2: React.FC<CreateScreen2Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [avatar, setAvatar] = useState();
  const URL = '123123';

  return (
    <AppWrapper style={{paddingHorizontal: 16, paddingBottom: 12}}>
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
                top: -50,
              }}
            />
          )}
          <Image
            source={avatar ? avatar : ImageAddAvatar}
            style={{
              width: safeAreaInsets.screenWidth - 128,
              height: safeAreaInsets.screenWidth - 128,
            }}
            containerStyle={{alignSelf: 'center'}}
          />
        </TouchableOpacity>

        <Text style={[styles.textCap1, {opacity: 0.6}]}>
          You can always change your image later.
        </Text>
      </View>
      <AppButton
        buttonStyle={{
          opacity: URL ? 1 : 0.6,
        }}
        title="Continue"
        disable={!URL}
        onPress={() => {
          tabIndex(2);
        }}
      />
      <BottomSelectedModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setImage={setAvatar}
      />
    </AppWrapper>
  );
};

export default CreateScreen2;

const ListOption = [
  {icon: IconCamera, title: 'Take Photo'},
  {icon: IconImage, title: 'Choose image'},
  {icon: IconEmoji, title: 'Use emoji'},
];

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
                setImage(ImageAvatar);
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
