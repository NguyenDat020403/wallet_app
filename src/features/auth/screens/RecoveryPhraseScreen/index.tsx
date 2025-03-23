import React from 'react';
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
          <FlatList
            data={ListSecretWords}
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
      </View>
      <View style={{paddingHorizontal: 16}}>
        <OptionItem
          onPress={() => {
            navigation.navigate('IcloudBackUpScreen');
          }}
          title="iCloud Backup"
          icon={IconCloudBackUp}
          desc="Encrypt your secret recovery phrase with a password."
          iconRight={IconArrowRight}
        />
        <OptionItem
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
