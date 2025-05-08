import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppButton, AppHeader, AppWrapper} from '@/components';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Image} from '@rneui/base';
import {IconDelete, IconQR} from '@/assets/icons';
import AppTextInput from '@/components/AppTextInput';
import {useForm, useWatch} from 'react-hook-form';
import Clipboard from '@react-native-clipboard/clipboard';
import {IconCopy} from '../../assets/icons';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

interface ImportWalletScreenProps
  extends MainStackScreenProps<'ImportWalletScreen'> {}

const ImportWalletScreen: React.FC<ImportWalletScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [copiedText, setCopiedText] = useState('');
  const [isPressPaste, setIsPressPaste] = useState(false);
  const {control, handleSubmit, setValue} = useForm();

  const words = useWatch({control, name: 'mnemonic'});
  const wordSplit = words && words.trim().split(/\s+/);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setIsPressPaste(!isPressPaste);
    if (!isPressPaste) {
      setValue('mnemonic', text);
    } else {
      setValue('mnemonic', '');
    }
  };

  const renderListWord = () => {
    return wordSplit.map((item: string, index: string) => (
      <Text key={index} style={styles.textBoxWord}>
        {index + 1}. {item}
      </Text>
    ));
  };

  return (
    <AppWrapper>
      <AppHeader
        title="Import Wallet"
        style={{paddingHorizontal: 16}}
        rightComponent={
          <TouchableOpacity>
            <Image source={IconQR} style={{width: 28, height: 28}} />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <Text style={styles.textBody2Medium}>
          Enter your seed phrase or private key
        </Text>
        <AppTextInput
          key={'mnemonic'}
          name="mnemonic"
          control={control}
          type="INPUT"
          style={{padding: 16, height: 120}}
          onChangeText={setCopiedText}
          textAlignVertical="top"
          multiline={true}
          placeholder="If you're using a seed phrase to import your wallet, separate each word with a space."
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={fetchCopiedText}
          style={styles.boxPaste}>
          <Image
            source={!isPressPaste ? IconCopy : IconDelete}
            style={{width: 24, height: 24}}
          />
          <Text style={styles.textBody1Regular}>
            {!isPressPaste ? 'Paste' : 'Clear'}
          </Text>
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginVertical: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              flexWrap: 'wrap',
            }}>
            {words ? renderListWord() : <></>}
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior="padding">
        <AppButton
          buttonStyle={{marginHorizontal: 16, marginBottom: 16}}
          title="Confirm"
          onPress={() => {
            console.log('da nhan');
          }}
        />
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};
export default ImportWalletScreen;
