import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  iconFind: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 24,
    left: 12,
  },
}));

export default useStyles;
