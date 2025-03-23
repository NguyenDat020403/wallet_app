import React, {useState} from 'react';
import {View} from 'react-native';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {TabView} from '@rneui/base';
import {IcloudBackUpScreen1} from './components';

interface IcloudBackUpScreenProps
  extends MainStackScreenProps<'IcloudBackUpScreen'> {}

const IcloudBackUpScreen: React.FC<IcloudBackUpScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader
          title="Icloud Backup"
          titleStyle={{color: '#FFFFFF'}}
          style={{
            zIndex: 1,
            paddingHorizontal: 16,
          }}
        />
        <TabView value={tabIndex} onChange={setTabIndex} disableSwipe={true}>
          {/* Tab 1 */}
          <TabView.Item style={{flex: 1}}>
            <IcloudBackUpScreen1 tabIndex={handleTabIndex} />
          </TabView.Item>
          {/* Tab 2 */}
          <TabView.Item style={{flex: 1}}>
            <IcloudBackUpScreen1 tabIndex={handleTabIndex} />
          </TabView.Item>
          {/* Tab 3 */}
          {/* <TabView.Item style={{flex: 1}}>
            <CreateScreen3 tabIndex={handleTabIndex} />
          </TabView.Item> */}
        </TabView>
      </View>
    </AppWrapper>
  );
};

export default IcloudBackUpScreen;
