import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {OptionItem} from '../../components';
import {
  IconArrowRight,
  IconCloudBackUp,
  IconManualBackUp,
} from '../../assets/icons';
import {useAppSelector} from '@/redux/hooks';
// import {useLazyLoginUserQuery} from '../../redux/RTKQuery';
import {BlurView} from '@react-native-community/blur';

interface RecoveryPhraseScreenProps
  extends MainStackScreenProps<'RecoveryPhraseScreen'> {}

const ListSecretWords = [
  'physical',
  'vote',
  'apple',
  'eager',
  'income',
  'obey',
  'summer',
  'other',
  'purpose',
  'radar',
  'avoid',
  'draw',
];

const RecoveryPhraseScreen: React.FC<RecoveryPhraseScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const walletSecret = useAppSelector(state => state.authReducer.secretLocal);
  const words = walletSecret.mnemonic.split(' ');

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader />
        <View style={{gap: 16}}>
          <Text style={styles.textBody3Regular}>
            Your Secret Recovery Phrase
          </Text>
          <Text style={styles.textBody2Regular}>
            For your eyes only.{' '}
            <Text style={[styles.textBody2Regular, {color: '#A87AD7'}]}>
              Do not share.
            </Text>
          </Text>
        </View>
        <MnemonicItem words={words} />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <OptionItem
          onPress={() => {
            // navigation.navigate('IcloudBackUpScreen');
            // getData({name: 'Dat'});
          }}
          title="iCloud Backup"
          icon={IconCloudBackUp}
          desc="Encrypt your secret recovery phrase with a password."
          iconRight={IconArrowRight}
        />
        <OptionItem
          onPress={() => {
            navigation.navigate('ManualBackUpScreen', {
              listWordSecret: ListSecretWords,
            });
          }}
          title="Manual Backup"
          icon={IconManualBackUp}
          desc="Save your secret recovery phrase in a safe location."
          iconRight={IconArrowRight}
        />
      </View>
    </AppWrapper>
  );
};

export default RecoveryPhraseScreen;

const MnemonicItem = (words: any) => {
  const styles = useStyles();
  return (
    <View style={{position: 'relative'}}>
      <BlurView
        style={styles.blurStyle}
        blurType="light"
        blurAmount={10}
        overlayColor="#FFFFFF00"
      />

      <FlatList
        data={words}
        renderItem={({item, index}) => (
          <Text style={styles.textBody1Regular}>
            {index + 1}. {item}
          </Text>
        )}
        contentContainerStyle={styles.boxSecret}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};
