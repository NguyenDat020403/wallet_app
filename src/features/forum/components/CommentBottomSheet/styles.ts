import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  textCap1: {
    ...typography.caption1,
  },
  iconImage: {
    width: 60,
    height: 60,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}));

export default useStyles;
