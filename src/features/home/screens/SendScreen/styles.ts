import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  iconFind: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 24,
    left: 12,
  },
}));

export default useStyles;
