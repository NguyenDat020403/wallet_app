import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useForm} from 'react-hook-form';
import {Image} from '@rneui/base';
import {ImageAddAvatar} from '@/features/auth/assets/images';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

interface CreateScreen2Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen2: React.FC<CreateScreen2Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();

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
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={ImageAddAvatar}
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
    </AppWrapper>
  );
};

export default CreateScreen2;
