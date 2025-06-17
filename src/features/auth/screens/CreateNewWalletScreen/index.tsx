import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {TabView} from '@rneui/base';
import {CreateScreen1, CreateScreen2, CreateScreen3} from './components';
import AppHeader from '@/components/AppHeader';

interface CreateNewWalletScreenProps
  extends MainStackScreenProps<'CreateNewWalletScreen'> {}

const CreateNewWalletScreen: React.FC<CreateNewWalletScreenProps> = ({}) => {
  const styles = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader
          title="Create New Account"
          style={{
            paddingHorizontal: 16,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
          }}>
          {[0, 1, 2, 3].map(index => (
            <View
              key={index}
              style={[
                styles.tabBar,
                {
                  backgroundColor: tabIndex === index ? '#000' : '#B3B3B3',
                },
              ]}
            />
          ))}
        </View>
        <TabView value={tabIndex} onChange={setTabIndex} disableSwipe={true}>
          {/* Tab 1 */}
          <TabView.Item style={{flex: 1}}>
            <CreateScreen1 tabIndex={handleTabIndex} />
          </TabView.Item>
          {/* Tab 2 */}
          <TabView.Item style={{flex: 1}}>
            <CreateScreen2 tabIndex={handleTabIndex} />
          </TabView.Item>
          {/* Tab 3 */}
          <TabView.Item style={{flex: 1}}>
            <CreateScreen3 tabIndex={handleTabIndex} />
          </TabView.Item>
        </TabView>
      </View>
    </AppWrapper>
  );
};

export default CreateNewWalletScreen;
