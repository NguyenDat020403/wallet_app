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
  setting: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
    paddingBottom: 24,
  },
}));

export default useStyles;
