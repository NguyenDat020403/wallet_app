import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  textRegular: {
    ...typography.body1Regular,
  },
  textSemiBold: {
    ...typography.body2SemiBold,
  },
  textCap: {
    ...typography.caption1,
  },
}));

export default useStyles;
