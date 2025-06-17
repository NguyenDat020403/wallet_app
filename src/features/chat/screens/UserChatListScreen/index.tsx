import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppHeader from '@/components/AppHeader';
import {useGetUserChatsMutation} from '../../redux/RTKQuery';
import {useAppSelector} from '@/redux/hooks';
import {ChatItem} from './components';
import {ItemChatResponse} from '../../redux/RTKQuery/types';
import {useFocusEffect} from '@react-navigation/native';
import {IconWarning} from '@/assets/icons';
import {Image} from '@rneui/base';
import {AppListLoading} from '@/components';
import {Text} from 'react-native';

interface UserChatListScreenProps
  extends MainStackScreenProps<'UserChatListScreen'> {}

const UserChatListScreen: React.FC<UserChatListScreenProps> = ({
  navigation,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const [getUserChats, {isLoading, data: chats}] = useGetUserChatsMutation();
  const [data, setData] = useState<ItemChatResponse[]>();
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const res = await getUserChats({}).unwrap();
        setData(res);
      };

      fetchData();

      // Optional cleanup if needed
      return () => {};
    }, [getUserChats]),
  );

  return (
    <AppWrapper>
      <AppHeader style={{paddingHorizontal: 16}} />
      <View style={styles.container}>
        <FlatList
          data={data}
          contentContainerStyle={{gap: 4}}
          ListEmptyComponent={
            isLoading ? (
              <AppListLoading isLoading={isLoading} />
            ) : !chats ? (
              <View style={styles.noTokenContainer}>
                <Image source={IconWarning} style={{width: 150, height: 150}} />
                <Text style={styles.textBody3Regular}>No chat found</Text>
              </View>
            ) : (
              <></>
            )
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <ChatItem data={item} />;
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default UserChatListScreen;
