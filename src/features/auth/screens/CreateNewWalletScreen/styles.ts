import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  tabBar: {
    height: 4,
    borderRadius: 12,
    width: (ScreenWidth - 32) / 5,
  },
}));

export default useStyles;
