import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  tabBar: {
    height: 4,
    borderRadius: 12,
    width: (insets.screenWidth - 32) / 5,
  },
  iconHeader: {
    width: 24,
    height: 24,
  },
}));

export default useStyles;
