import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import {demoStory1, demoStory2, demoStory3} from '@/assets/images';
import {ScreenWidth} from '@rneui/base';
import {IconPlay} from '@/assets/icons';
import {navigate} from '@/navigation/RootNavigation';

type StoryItemProps = {
  data: any;
};
const WIDTH_ITEM_SCALE = ScreenWidth / 3;
const HEIGHT_ITEM_SCALE = (ScreenWidth / 27) * 16;

const StoryItem: React.FC<StoryItemProps> = ({data}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container]}
      onPress={() => {
        navigate('StoryScreen', {userId: data.userId});
      }}>
      {data.isLive && (
        <View style={styles.liveFlag}>
          <Text style={styles.textLive}>Live</Text>
        </View>
      )}
      <View
        style={[
          styles.iconPlay,
          {width: WIDTH_ITEM_SCALE, height: HEIGHT_ITEM_SCALE},
        ]}>
        <Image source={IconPlay} style={{width: 29, height: 29}} />
      </View>

      <Image
        source={demoStory3}
        style={{
          width: WIDTH_ITEM_SCALE,
          height: HEIGHT_ITEM_SCALE,
          resizeMode: 'cover',
        }}
        containerStyle={{
          borderRadius: 9,
          shadowColor: '#000',
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 0.25,
          shadowRadius: 9,
          elevation: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default StoryItem;
