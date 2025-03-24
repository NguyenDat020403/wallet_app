import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {Image} from '@rneui/base';
import {IconCopy} from '../../assets/icons';

interface ManualBackUpScreenProps
  extends MainStackScreenProps<'ManualBackUpScreen'> {}

const ManualBackUpScreen: React.FC<ManualBackUpScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  return (
    <AppWrapper style={{paddingBottom: 12}}>
      <View style={styles.container}>
        <AppHeader />
        <View style={{gap: 16}}>
          <Text style={styles.textBody3Regular}>Manual Backup</Text>
          <Text style={styles.textBody2Regular}>
            Save your secret recovery phrase in a safe location.
          </Text>
          <FlatList
            data={route.params.listWordSecret}
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

          <TouchableOpacity
            style={{flexDirection: 'row', gap: 12, alignSelf: 'center'}}>
            <Image source={IconCopy} style={{width: 24, height: 24}} />
            <Text style={styles.textBody2Regular}>Copy to Clipboard</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Text style={styles.textCap1}>
          Next, you’ll be asked to confirm the position of certain words.
        </Text>
        <AppButton
          onPress={() => {
            navigation.navigate('ConfirmManualBackUpScreen', {
              listWordSecret: route.params.listWordSecret,
            });
          }}
          title="I Understand, Continue"
        />
      </View>
    </AppWrapper>
  );
};

export default ManualBackUpScreen;
