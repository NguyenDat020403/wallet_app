import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppBottomSheetModal, AppImage} from '@/components';
import {convertDate} from './functions';
import {Icon} from '@rneui/base';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {useDeletePostMutation} from '../../redux/RTKQuery';
import {setPostDeletedId} from '../../redux/slices';
import {goBack, navigate} from '@/navigation/RootNavigation';

type UserHeaderInfoProps = {
  id: string;
  name: string;
  avatar: string;
  created_at?: string;
  postId?: string;
  isGoBack?: boolean;
};

const UserHeaderInfo: React.FC<UserHeaderInfoProps> = ({
  id,
  name,
  avatar,
  created_at,
  postId,
  isGoBack,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const [deletePost] = useDeletePostMutation();
  const [isVisible, setIsVisible] = useState(false);

  const ListAction = [
    {
      isAuth: id === currentUser.user_id,
      title: 'Delete',
      icon: 'trash',
      onPress: () => {
        console.log('delete');
        if (postId !== undefined) {
          deletePost({post_id: postId});
          setIsVisible(false);
          dispatch(setPostDeletedId(postId));
          isGoBack && goBack();
        }
      },
    },
    {
      isAuth: true,
      title: 'Share',
      icon: 'share-2',
      onPress: () => {
        console.log('share');
      },
    },
  ];

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('ProfileScreen', {userId: id});
      }}
      style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', gap: 12}}>
        <AppImage
          source={{uri: avatar}}
          type="AVATAR"
          style={{width: 40, height: 40}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.textBody2Medium}>{name}</Text>
          {created_at && (
            <Text style={styles.textCap1}>{convertDate(created_at)}</Text>
          )}
        </View>
      </View>
      {postId && (
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}>
          <Icon
            type="feather"
            name="more-horizontal"
            iconStyle={{fontSize: 16}}
          />
        </TouchableOpacity>
      )}
      <AppBottomSheetModal
        autoSize
        isVisible={isVisible}
        setIsVisible={setIsVisible}>
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: safeAreaInsets.bottom + 16,
            marginTop: 16,
            gap: 16,
          }}>
          {ListAction.map((item, index) => {
            if (item.isAuth) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    item.onPress();
                  }}
                  style={{
                    flexDirection: 'row',
                    gap: 16,
                    backgroundColor: '#efefef',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                  }}>
                  <Icon
                    type="feather"
                    name={item.icon}
                    iconStyle={{fontSize: 20}}
                  />
                  <Text style={styles.textBody2SemiBold}>{item.title}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </AppBottomSheetModal>
    </TouchableOpacity>
  );
};

export default UserHeaderInfo;
