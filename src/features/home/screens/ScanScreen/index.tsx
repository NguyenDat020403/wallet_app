import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';

import {RNCamera} from 'react-native-camera';

interface ScanScreenProps extends MainStackScreenProps<'ScanScreen'> {}

const ScanScreen: React.FC<ScanScreenProps> = ({navigation, route}) => {
  const styles = useStyles();

  const [scanned, setScanned] = useState(false);

  const onBarCodeRead = ({data}) => {
    if (scanned) return;

    setScanned(true);
    console.log('QR Data:', data);
  };
  return (
    <View style={{flex: 1}}>
      <RNCamera
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Yêu cầu quyền camera',
          message: 'Ứng dụng cần quyền dùng camera để quét mã QR',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Hủy',
        }}>
        <View
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: '#00FF00',
            margin: 30,
            borderRadius: 8,
          }}
        />
      </RNCamera>
    </View>
  );
};

export default ScanScreen;
