import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16},
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textCap1: {
    ...typography.caption1,
  },
}));

export default useStyles;
