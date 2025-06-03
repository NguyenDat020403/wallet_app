import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconCamera, IconNotification} from '@/features/auth/assets/icons';
import {navigate} from '@/navigation/RootNavigation';
import {OptionItem} from '@/features/auth/components';
import {
  requestCameraPermission,
  requestUserPermission,
} from '@/functions/notification/functions';
import {showToastMessage} from '@/functions';

interface CreateScreen3Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen3: React.FC<CreateScreen3Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textBody3Regular}>Enable Permissions</Text>
        <Text
          style={[styles.textBody3Regular, {opacity: 0.6, marginBottom: 16}]}>
          For the best experience, please allow access to the following
          permissions.
        </Text>
        <OptionItem
          isForCheck
          title="Camera"
          icon={IconCamera}
          onPress={async () => {
            await requestCameraPermission();
          }}
          desc="Press here to enable"
          textBelow="Scan QR codes to scan wallet address and connect to apps."
        />
        <OptionItem
          isForCheck
          onPress={async () => {
            await requestUserPermission();
          }}
          title="Notifications"
          icon={IconNotification}
          desc="Press here to enable"
          textBelow="Get notified of new wallet activity and other important events."
        />
        <Text
          style={[
            styles.textCap1,
            {opacity: 0.6, marginBottom: 16, textAlign: 'center'},
          ]}>
          You can always change your preferences later.
        </Text>
      </View>
      <AppButton
        title="Continue"
        onPress={() => {
          navigate('BackUpWalletScreen');
        }}
      />
    </View>
  );
};

export default CreateScreen3;
