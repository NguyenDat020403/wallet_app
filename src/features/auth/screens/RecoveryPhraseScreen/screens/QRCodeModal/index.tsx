import {View, Text} from 'react-native';
import React from 'react';
import useStyles from './styles';
import ReactNativeModal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import {Overlay} from '@rneui/base';

type QRCodeModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: string;
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isVisible,
  setIsVisible,
  data,
}) => {
  const styles = useStyles();
  return (
    <ReactNativeModal
      coverScreen={true}
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      }}
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <QRCode value={data} size={250} />
    </ReactNativeModal>
  );
};

export default QRCodeModal;
