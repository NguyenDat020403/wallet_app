import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppHeader from '@/components/AppHeader';
import {useGetListPostMutation} from '../../redux/RTKQuery';
import {PostMediaView, UserHeaderInfo} from '../../components';
import {AppImage} from '@/components';
import {useAppSelector} from '@/redux/hooks';
import {IconPicture} from '@/assets/icons';

interface PostScreenProps extends MainStackScreenProps<'PostScreen'> {}

const PostScreen: React.FC<PostScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const [getListPost, {data, isLoading}] = useGetListPostMutation();
  useEffect(() => {
    getListPost({page: 1, limit: 5});
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getListPost({page: 1, limit: 5}).unwrap();
    setRefreshing(false);
  };
  return (
    <AppWrapper>
      <AppHeader style={{paddingHorizontal: 16}} title="Post" />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          borderWidth: 0.5,
          borderColor: '#FFF',
          borderRadius: 12,
          backgroundColor: '#333',
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginHorizontal: 16,
          marginVertical: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}>
          <AppImage
            source={{uri: currentUser.avatar}}
            type="AVATAR"
            style={{width: 32, height: 32}}
          />
          <Text style={styles.textBody1Regular}>Got any news?</Text>
        </View>
        <AppImage
          source={IconPicture}
          style={{width: 20, height: 20}}
          haveDefault={false}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          refreshing={isLoading || refreshing}
          onRefresh={onRefresh}
          data={data}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() => {
            return <Text style={styles.textBody1Regular}> No data </Text>;
          }}
          renderItem={({item}) => {
            return (
              <>
                <View style={{padding: 16}}>
                  <UserHeaderInfo
                    name={item.user.username}
                    avatar={item.user.avatar}
                    created_at={item.created_at}
                  />
                  <Text style={styles.textBody1Regular}>{item.content}</Text>
                  <PostMediaView resource={item.images} />
                </View>
                <View style={styles.divider} />
              </>
            );
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default PostScreen;
