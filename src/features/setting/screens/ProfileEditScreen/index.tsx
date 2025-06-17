import React, {useState} from 'react';
import {
  AppButton,
  AppDialog,
  AppImage,
  AppTextInput,
  AppWrapper,
} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {SubmitHandler, useForm, useWatch} from 'react-hook-form';
import {schemaValidate} from './schemaValidate';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native';
import {Icon} from '@rneui/base';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateUser} from '../../redux/slices';

interface ProfileEditScreenProps
  extends MainStackScreenProps<'ProfileEditScreen'> {}
type FormValues = {
  accountName: string;
  bio: string | undefined;
};

const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const dispatch = useAppDispatch();
  const {currentUser} = useAppSelector(state => state.authReducer);
  const [avatar, setAvatar] = useState<{
    uri: string;
    name: string;
    type: string;
  }>();
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      accountName: currentUser.username,
      bio: currentUser.bio,
    },
    resolver: yupResolver(schemaValidate),
  });

  const bioWatch = useWatch({control, name: 'bio'});
  const isMaxLength = bioWatch && bioWatch.length > 255;

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    const asset = result.assets?.[0];
    if (asset) {
      setAvatar({
        uri: asset.uri || '',
        name: asset.fileName || '',
        type: asset.type || '',
      });
    }
  };
  const onSave: SubmitHandler<FormValues> = body => {
    dispatch(
      updateUser({
        username: body.accountName,
        bio: body.bio,
        file: avatar,
        callback: () => {
          setIsVisibleDialog(true);
        },
      }),
    );
  };
  return (
    <AppWrapper>
      <AppHeader title="Edit" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
          <View
            style={{
              position: 'relative',
              width: 120,
              alignSelf: 'center',
            }}>
            <AppImage
              source={{uri: avatar ? avatar.uri : currentUser?.avatar}}
              style={{width: 120, height: 120, borderRadius: 160}}
            />
            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#FFF',
                borderRadius: 150,
                padding: 2,
              }}>
              <Icon
                type="feather"
                name="edit"
                iconStyle={{
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: '#efefef',
                  borderRadius: 150,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <AppTextInput
              key={'accountName'}
              type="INPUT"
              title="Username"
              required
              name="accountName"
              control={control}
            />
            <AppTextInput
              key={'bio'}
              type="INPUT"
              title="Bio"
              name="bio"
              style={{height: 200, paddingTop: 12}}
              textAlignVertical="top"
              multiline={true}
              control={control}
            />
          </KeyboardAvoidingView>
          <Text
            style={[styles.textCap1, {color: isMaxLength ? 'red' : '#333333'}]}>
            {bioWatch && bioWatch.length}/255
          </Text>
        </ScrollView>
        <AppButton
          title="Save"
          onPress={() => {
            handleSubmit(onSave)();
          }}
        />
        <AppDialog
          onPress={() => {
            setIsVisibleDialog(false);
          }}
          action="SUCCESS"
          title="Success"
          isVisible={isVisibleDialog}
          setIsVisible={setIsVisibleDialog}
          titleButton="Confirm"
        />
      </View>
    </AppWrapper>
  );
};

export default ProfileEditScreen;
