import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useForm} from 'react-hook-form';
import {Image} from '@rneui/base';
import {ImageAddAvatar} from '@/features/auth/assets/images';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {
  IconCamera,
  IconChecked,
  IconCheckedDone,
  IconNotification,
} from '@/features/auth/assets/icons';

interface CreateScreen3Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen3: React.FC<CreateScreen3Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();

  const URL = '123123';

  return (
    <AppWrapper style={{paddingHorizontal: 16, paddingBottom: 12}}>
      <View style={styles.container}>
        <Text style={styles.textBody3Regular}>Enable Permissions</Text>
        <Text style={[styles.textBody3Regular, {opacity: 0.6}]}>
          For the best experience, please allow access to the following
          permissions.
        </Text>
        <PermissionItem
          title="Camera"
          icon={IconCamera}
          desc="Scan QR codes to scan wallet address and connect to apps."
        />
        <PermissionItem
          title="Notifications"
          icon={IconNotification}
          desc="Get notified of new wallet activity and other important events."
        />
      </View>
      <Text
        style={[
          styles.textCap1,
          {opacity: 0.6, marginBottom: 16, textAlign: 'center'},
        ]}>
        You can always change your preferences later.
      </Text>
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

export default CreateScreen3;

type PermissionItemProps = {
  title: string;
  desc?: string;
  icon: any;
};
const PermissionItem: React.FC<PermissionItemProps> = ({title, desc, icon}) => {
  const styles = useStyles();
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <View style={{marginVertical: 16}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setIsAccepted(!isAccepted);
        }}
        style={styles.permissionItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Image source={icon} style={styles.icons} />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.textBody3Regular}>{title}</Text>
            <Text style={[styles.textCap1, {opacity: 0.5}]}>Tap to enable</Text>
          </View>
        </View>
        {!isAccepted ? (
          <Image source={IconChecked} style={styles.icons} />
        ) : (
          <Image source={IconCheckedDone} style={styles.icons} />
        )}
      </TouchableOpacity>
      <Text style={[styles.textCap1, {opacity: 0.6}]}>
        Scan QR codes to scan wallet address and connect to apps.
      </Text>
    </View>
  );
};
