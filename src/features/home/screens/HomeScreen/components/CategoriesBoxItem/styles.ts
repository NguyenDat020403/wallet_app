import {AppEdgeInsets} from '@/hooks/types';
import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
const IMAGE_WIDTH_HEIGHT = ((ScreenWidth - 32) / 2 - 20) / 2;

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    width: (insets.screenWidth - 32) / 2 - 5,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 9,
    flexDirection: 'column',
    gap: 5,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  image: {
    width: IMAGE_WIDTH_HEIGHT,
    height: IMAGE_WIDTH_HEIGHT,
    resizeMode: 'cover',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
  },
  name: {
    maxWidth: (insets.screenWidth - 32 - 5) / 2 - 10 - 40 - 5,
    fontFamily: 'nunito_bold',
    fontSize: 17,
    lineHeight: 21,
    color: '#202020',
  },
  quantity: {
    width: 40,
    fontFamily: 'nunito_bold',
    fontSize: 12,
    lineHeight: 21,
    color: '#202020',
    backgroundColor: '#F3F3F3',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
}));

export default useStyles;
