import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppDialog, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {showToastMessage} from '@/functions';
import {useAppDispatch} from '@/redux/hooks';
import {logout} from '../../redux/slices';

interface ConfirmManualBackUpScreenProps
  extends MainStackScreenProps<'ConfirmManualBackUpScreen'> {}

const ConfirmManualBackUpScreen: React.FC<ConfirmManualBackUpScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [data, setData] = useState([
    {id: '1', selectedWord: ''},
    {id: '2', selectedWord: ''},
    {id: '3', selectedWord: ''},
  ]);
  const [failCount, setFailCount] = useState(0);

  const listWord = route.params.listWordSecret;
  const list1 = [listWord[0], listWord[2], listWord[6]];
  const list2 = [listWord[8], listWord[2], listWord[5]];
  const list3 = [listWord[10], listWord[11], listWord[4]];
  const updateItem = (word: string, id: number) => {
    let newData = [...data];

    newData[id].selectedWord = word;

    setIsCheckMatch(false);
    setData(newData);
  };
  const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false);
  const [isCheckMatch, setIsCheckMatch] = useState(false);

  const handleToContinue = () => {
    if (
      data[0].selectedWord === listWord[2] &&
      data[1].selectedWord === listWord[8] &&
      data[2].selectedWord === listWord[10]
    ) {
      setIsVisibleSuccessModal(true);
    } else {
      const newFailCount = failCount + 1;
      setFailCount(newFailCount);
      if (newFailCount >= 5) {
        dispatch(logout());
        navigation.reset({
          index: 0,
          routes: [{name: 'FirstScreen'}],
        });
      } else {
        showToastMessage(`Incorrect, try again. ${newFailCount}`);
      }
    }
  };

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader />
        <View style={{gap: 16}}>
          <Text style={styles.textBody3Regular}>Confirm Backup</Text>
          <Text style={[styles.textBody2Regular, {opacity: 0.6}]}>
            Complete this quick test to confirm you’ve saved everything
            correctly.
          </Text>
          <Text style={[styles.textBody3Regular, styles.boxWord]}>
            3. {data[0].selectedWord}
          </Text>
          <View style={{flexDirection: 'row', gap: 16}}>
            {list1.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    updateItem(item, 0);
                  }}>
                  <Text style={[styles.textBody2Regular, styles.wordSelect]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.textBody3Regular, styles.boxWord]}>
            9. {data[1].selectedWord}
          </Text>
          <View style={{flexDirection: 'row', gap: 16}}>
            {list2.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    updateItem(item, 1);
                  }}>
                  <Text style={[styles.textBody2Regular, styles.wordSelect]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.textBody3Regular, styles.boxWord]}>
            11. {data[2].selectedWord}
          </Text>
          <View style={{flexDirection: 'row', gap: 16}}>
            {list3.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    updateItem(item, 2);
                  }}>
                  <Text style={[styles.textBody2Regular, styles.wordSelect]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 16}}>
        {isCheckMatch && (
          <Text
            style={[
              styles.textCap1,
              {color: '#BC3C20', marginBottom: 16, textAlign: 'center'},
            ]}>
            Incorrect, try again.
          </Text>
        )}
        <AppButton
          onPress={() => {
            handleToContinue();
          }}
          title="Confirm"
        />
      </View>
      <AppDialog
        titleButton="Continue"
        onPress={() => {
          navigation.navigate('AppTabScreen');
        }}
        setIsVisible={setIsVisibleSuccessModal}
        isVisible={isVisibleSuccessModal}
        title="Manual Backup Completed ✅"
        desc="This wallet was successfully backed up."
      />
    </AppWrapper>
  );
};

export default ConfirmManualBackUpScreen;
