import React, {useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {
  demoStory1,
  demoStory2,
  demoStory3,
  ImageDemoStory,
} from '#/src/assets/images';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {Image} from '@rneui/themed';
import {IconEyeOn, IconForward, IconLive} from '@/assets/icons';
import {Text} from 'react-native';
import {goBack} from '@/navigation/RootNavigation';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {StoryResource, StoryResponse} from './types';
import {ScreenWidth} from '@rneui/base';

interface StoryScreenProps extends MainStackScreenProps<'StoryScreen'> {}

const StoryScreen: React.FC<StoryScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const DEMO_DATA_RESPONSE = StoryResponse;
  const [currentIndex, setCurrentIndex] = useState<number | null>();

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  return (
    <AppWrapper style={{position: 'relative'}}>
      <FlatList
        data={DEMO_DATA_RESPONSE}
        pagingEnabled
        renderItem={({item}) => {
          return (
            <View
              style={{flex: 1, height: safeAreaInsets.screenHeight - 60 - 16}}>
              <FlatList
                scrollEventThrottle={16}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                data={DEMO_DATA_RESPONSE[0].resource}
                style={styles.container}
                onViewableItemsChanged={({viewableItems, changed}) => {
                  const index = viewableItems[0]?.index;
                  const indexNext = viewableItems[1];
                  if (!index && !indexNext) {
                    setCurrentIndex(undefined);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
                keyExtractor={item => item.backgroundSoundUrl}
                renderItem={({item, index}) => {
                  return <StoryDetailItem data={item} />;
                }}
              />
              <View style={styles.detail}>
                <View style={styles.views}>
                  <Image
                    source={IconEyeOn}
                    style={{width: 22, height: 18, resizeMode: 'cover'}}
                  />
                  <Text style={styles.textViews}>2,530</Text>
                </View>
                <Image
                  source={IconLive}
                  style={{width: 40, height: 18, resizeMode: 'cover'}}
                />
                <TouchableOpacity>
                  <Image
                    source={IconForward}
                    style={{width: 25, height: 18, resizeMode: 'cover'}}
                  />
                </TouchableOpacity>
                <AppButton
                  title="Shop"
                  buttonStyle={styles.shopButton}
                  textStyle={styles.textButton}
                />
              </View>
            </View>
          );
        }}
      />
    </AppWrapper>
  );
};

type StoryDetailItemProps = {
  data: StoryResource;
};
const StoryDetailItem: React.FC<StoryDetailItemProps> = ({data}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} style={{paddingHorizontal: 16}}>
        <Image
          source={{
            uri: data.url,
          }}
          style={styles.image}
          containerStyle={{borderRadius: 9}}
        />
      </TouchableOpacity>
    </>
  );
};

export default StoryScreen;
