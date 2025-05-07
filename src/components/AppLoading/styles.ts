import {AppEdgeInsets} from '@/hooks/types';
import {ScreenHeight, ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    width: insets.screenWidth,
    height: insets.screenHeight,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  logo: {
    position: 'absolute',
  },
}));

export default useStyles;
