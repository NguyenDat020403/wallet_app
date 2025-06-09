import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {
  AppBottomSheetModal,
  AppButton,
  AppHeader,
  AppImage,
  AppWrapper,
} from '@/components';
import {TouchableOpacity} from 'react-native';
import {useTokenByNetworkMutation} from '@/features/home/redux/RTKQuery';
import QRCode from 'react-native-qrcode-svg';
import {IconCopy} from '@/features/auth/assets/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@/functions';
import {Icon, ScreenWidth} from '@rneui/base';
import RNFS from 'react-native-fs'; // đọc/ghi file
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {captureRef} from 'react-native-view-shot';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Tokens} from '../../redux/RTKQuery/types';
import Share from 'react-native-share';

interface ReceiveQRCodeScreenProps
  extends MainStackScreenProps<'ReceiveQRCodeScreen'> {}

const ReceiveQRCodeScreen: React.FC<ReceiveQRCodeScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const dataTokens = route.params.data;
  const wallet_id = route.params.wallet_id;

  const [getTokenByNetwork, {data, isSuccess}] = useTokenByNetworkMutation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getTokenByNetwork({
      network_id: dataTokens.network.network_id,
      wallet_id: wallet_id,
    });
  }, []);

  const ref = useRef<View>(null);
  // Create a state variable to store the snapshot
  // const [image, setImage] = useState<SkImage | null>(null);

  // useEffect(() => {
  //   console.log(image);
  // }, [image]);
  // Create a function to take the snapshot
  // const onPress = async () => {
  //   if (!ref.current) {
  //     console.warn('ref.current is null!');
  //     return;
  //   }
  //   const snapshot = await makeImageFromView(ref);
  //   setImage(snapshot);
  //   console.log(snapshot);
  // };
  let svgRef = useRef<any>();
  let shareRef = useRef<any>();

  const saveQrToFile = async () => {
    // shareRef.current?.toDataURL(async (data: string) => {
    try {
      // const base64Data = data.replace(/^data:image\/png;base64,/, '');
      // const filename = `${RNFS.DocumentDirectoryPath}/qr_code.png`;

      // const result = await CameraRoll.saveAsset(filename, {
      //   type: 'photo',
      //   album: 'Qr Address',
      // });
      console.log('first');
      const uri = await captureRef(shareRef, {
        format: 'png',
        quality: 0.8,
      });

      const result = await CameraRoll.save(uri, {type: 'photo'});
      if (result) {
        showToastMessage('Saved!');
      } else {
        showToastMessage('Something wrong!');
      }
    } catch (error) {
      console.error('❌ Error saving QR:', error);
    }
    // });
  };

  const shareQr = async () => {
    const uri = await captureRef(shareRef, {
      format: 'png',
      quality: 0.8,
    });

    const shareOptions = {
      title: 'Share address',
      message: 'Scan my address',
      url: `file://${uri}`,
    };
    await Share.open(shareOptions);
  };

  const qrActions = [
    {
      icon: 'download',
      color: '#5f5f5f',
      onPress: saveQrToFile,
    },
    {
      icon: 'share',
      color: '#e8e8e8',
      onPress: shareQr,
    },
  ];

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader />
        <TouchableOpacity
          onLongPress={() => {
            setIsVisible(true);
          }}
          onPress={async () => {
            await Clipboard.setString(data?.address!);
            showToastMessage('Copied');
          }}
          activeOpacity={0.6}
          style={{alignSelf: 'center', paddingBottom: 16, paddingTop: 48}}>
          <View collapsable={false}>
            <View>
              <QRCode
                getRef={svgRef}
                // value={data?.address}
                value={'abcdefgh'}
                size={250}
                logo={{uri: dataTokens.token.thumbnail}}
                logoBorderRadius={150}
                logoSize={30}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={[styles.textBody1, {textAlign: 'center', flex: 1}]}>
          Send only asset{' '}
          <Text style={[styles.textBody1, {fontWeight: '700'}]}>
            {dataTokens.network.network_name}
          </Text>{' '}
          to this address
        </Text>
        <View style={{paddingHorizontal: 16}}>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Text style={styles.textBody3Bold}>{dataTokens.token.symbol}</Text>
            <Text style={[styles.textCap1, styles.backgroundNetwork]}>
              {dataTokens.network.network_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.textCap1, {width: ScreenWidth - 68}]}>
              {data?.address}
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await Clipboard.setString(data?.address!);
                showToastMessage('Copied');
              }}>
              <AppImage
                source={IconCopy}
                style={{width: 24, height: 24}}
                haveDefault={false}
              />
            </TouchableOpacity>
          </View>
          <AppButton
            onPress={() => {
              setIsVisible(true);
            }}
            title="Share QR Code"
            buttonStyle={{marginVertical: 16}}
          />
        </View>
      </View>
      <AppBottomSheetModal
        autoSize
        isVisible={isVisible}
        setIsVisible={setIsVisible}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.textBody3Bold}>Share this page</Text>
          <View
            ref={shareRef}
            style={{
              backgroundColor: '#FFF',
              alignItems: 'center',
              margin: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: '#5f5f5f',
              borderRadius: 8,
            }}>
            <QRCode
              value={data?.address}
              size={ScreenWidth - 32 - 48 - 48 - 2}
              logo={{uri: dataTokens.token.thumbnail}}
              logoBorderRadius={150}
              logoSize={30}
            />
            <Text
              style={[styles.textBody1, {textAlign: 'center', marginTop: 16}]}>
              Send only asset{' '}
              <Text style={[styles.textBody1, {fontWeight: '700'}]}>
                {dataTokens.network.network_name}
              </Text>{' '}
              to this address
            </Text>
            <View style={{paddingVertical: 16}}>
              <View style={{flexDirection: 'row', gap: 12}}>
                <Text style={styles.textBody3Bold}>
                  {dataTokens.token.symbol}
                </Text>
                <Text style={[styles.textCap1, styles.backgroundNetwork]}>
                  {dataTokens.network.network_name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[styles.textCap1]}>{data?.address}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={{paddingTop: 12}}>
              <Text style={styles.textBody1}>Crypto Wallet</Text>
              <Text style={styles.textCap1Bold}>
                Start your journey with crypto and discover a world of new
                opportunities.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignSelf: 'center',
            marginBottom: safeAreaInsets.bottom + 16,
          }}>
          {qrActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: action.color,
                padding: 8,
                borderRadius: 150,
                width: 56,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={action.onPress}>
              <Icon
                type="feather"
                name={action.icon}
                color={'#000'}
                iconStyle={{fontSize: 24}}
              />
            </TouchableOpacity>
          ))}
        </View>
      </AppBottomSheetModal>
    </AppWrapper>
  );
};

export default ReceiveQRCodeScreen;
