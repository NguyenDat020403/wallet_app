import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppHeader from '@/components/AppHeader';
import {
  useCreatePostMutation,
  useGetListPostMutation,
} from '../../redux/RTKQuery';
import {PostMediaView, UserHeaderInfo} from '../../components';
import {AppBottomSheetModal, AppButton, AppImage} from '@/components';
import {useAppSelector} from '@/redux/hooks';
import {IconAddImage, IconPicture} from '@/assets/icons';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {Icon, Image} from '@rneui/base';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import {Controller, useForm} from 'react-hook-form';

interface CreatePostScreenProps
  extends MainStackScreenProps<'CreatePostScreen'> {}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);

  const [imagesSelected, setSelectedImages] = useState<Asset[]>();
  const [isVisible, setIsVisible] = useState(false);
  const [createPost, {isLoading, error}] = useCreatePostMutation();

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    if (!result.didCancel && result.assets) {
      setSelectedImages(pre => {
        if (pre) {
          return [...pre, ...result.assets];
        }
        return result.assets;
      }); // lưu danh sách ảnh
    }
  };

  const handleOnPost = async (data, images: Asset[]) => {
    const formData = new FormData();

    // Thêm fields text
    formData.append('title', data.title);
    formData.append('content', data.content);

    // Thêm ảnh (nếu có)
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `image_${index}.jpg`,
      });
    });

    try {
      const res = await createPost(formData).unwrap();
      console.log('Post created:', res);
      // handle success (e.g. reset form, navigate, toast...)
    } catch (err) {
      console.error('Failed to create post:', err);
      // handle error
    }
  };

  const {control, handleSubmit} = useForm({
    defaultValues: {
      title: 'User create post',
      content: '',
    },
  });
  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        title="Create Post"
        rightComponent={
          <TouchableOpacity
            onPress={handleSubmit(data =>
              handleOnPost(data, imagesSelected || []),
            )}>
            <Text style={[styles.textBody1Regular, styles.buttonDone]}>
              Post
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <UserHeaderInfo
          name={currentUser.username || ''}
          avatar={currentUser.avatar || ''}
        />
        <Controller
          control={control}
          name="content"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={[
                styles.textBody3Regular,
                {flex: 1, textAlignVertical: 'top', marginTop: 16},
              ]}
              placeholder="Write something here"
              multiline
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <View style={{paddingTop: 12}}>
          <View style={{position: 'relative'}}>
            {imagesSelected && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  activeOpacity={0.8}
                  style={styles.editButton}>
                  <Icon
                    type="feather"
                    name="edit-2"
                    iconStyle={{fontSize: 16}}
                  />
                  <Text style={styles.textBody1Regular}>Edit</Text>
                </TouchableOpacity>
                <PostMediaView imagesDevice={imagesSelected} />
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.addImage} onPress={handlePickImage}>
            <View style={styles.iconAddImage}>
              <Image source={IconAddImage} style={{width: 20, height: 20}} />
            </View>
            <Text style={[styles.textBody1Bold, {textAlign: 'center'}]}>
              {imagesSelected ? 'Add more photos/videos' : 'Add photos/videos'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <AppButton title="Post" /> */}
        <AppBottomSheetModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          snapPoints={['100%']}>
          <AppHeader
            leftComponent={<Text style={styles.textBody1Regular}>Edit</Text>}
            rightComponent={
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={[styles.textBody1Regular, styles.buttonDone]}>
                  Done
                </Text>
              </TouchableOpacity>
            }
          />
          {imagesSelected && (
            <FlatList
              data={imagesSelected}
              renderItem={({item}) => {
                return (
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        //remove that image
                        const newImages = imagesSelected.filter(
                          img => img.uri !== item.uri,
                        );
                        setSelectedImages(newImages);
                        if (newImages.length === 0) {
                          setIsVisible(false);
                        }
                      }}
                      style={styles.removeImage}>
                      <Icon
                        type="feather"
                        name="x"
                        iconStyle={{fontSize: 16}}
                      />
                    </TouchableOpacity>
                    <AppImage
                      source={{uri: item.uri}}
                      style={{
                        width: safeAreaInsets.screenWidth,
                        height: (safeAreaInsets.screenWidth / 9) * 16,
                      }}
                    />
                  </View>
                );
              }}
            />
          )}
        </AppBottomSheetModal>
      </View>
    </AppWrapper>
  );
};

export default CreatePostScreen;
