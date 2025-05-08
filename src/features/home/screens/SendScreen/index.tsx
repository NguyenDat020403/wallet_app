import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppHeader, AppWrapper} from '@/components';
import {TouchableOpacity} from 'react-native';
import {TabView} from '@rneui/base';
import {CryptoTabItem} from '../../components';

interface SendScreenProps extends MainStackScreenProps<'SendScreen'> {}

const SendScreen: React.FC<SendScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const tokenData = route.params.listCoin;
  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader title="Send" style={{paddingHorizontal: 16}} />
        <View style={styles.tabBar}>
          {['Crypto', 'Collectibles'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabIndex(index)}
              style={tabIndex === index ? styles.underline : null}>
              <Text
                style={[
                  styles.textCap1,
                  {opacity: tabIndex === index ? 1 : 0.6, lineHeight: 24},
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TabView value={tabIndex} onChange={setTabIndex}>
          <TabView.Item style={{flex: 1}}>
            <CryptoTabItem data={tokenData} />
          </TabView.Item>
          <TabView.Item style={{flex: 1}}>
            <Text style={styles.textCap1}>2</Text>
          </TabView.Item>
        </TabView>
      </View>
    </AppWrapper>
  );
};

export default SendScreen;
