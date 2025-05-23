import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconCamera, IconNotification} from '@/features/auth/assets/icons';
import {navigate} from '@/navigation/RootNavigation';
import {OptionItem} from '@/features/auth/components';
import {useRegisterTokenNotificationMutation} from '@/features/home/redux/RTKQuery';
import {requestUserPermission} from '@/functions/notification/functions';
import {showToastMessage} from '@/functions';

interface CreateScreen3Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen3: React.FC<CreateScreen3Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [registerNotiToken, isSuccess] = useRegisterTokenNotificationMutation();
  const URL = '123123';
  useEffect(() => {
    if (isSuccess) {
      showToastMessage('success');
    } else {
      showToastMessage('failll');
    }
  }, [isSuccess]);

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
          desc="Enabled"
          textBelow="Scan QR codes to scan wallet address and connect to apps."
        />
        <OptionItem
          isForCheck
          onPress={async () => {
            const token = await requestUserPermission();
            if (token) {
              registerNotiToken({FCMToken: token});
              showToastMessage(token);
            } else {
              showToastMessage('Loi khi dang ki noti Token');
            }
          }}
          title="Notifications"
          icon={IconNotification}
          desc="Enabled"
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
        buttonStyle={{
          marginBottom: 16,
          opacity: URL ? 1 : 0.6,
        }}
        title="Continue"
        disable={!URL}
        onPress={() => {
          navigate('BackUpWalletScreen');
        }}
      />
    </View>
  );
};

export default CreateScreen3;
