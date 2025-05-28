import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  textRegular: {
    ...typography.body1Regular,
  },
  textSemiBold: {
    ...typography.body2SemiBold,
  },
  textCap: {
    ...typography.caption1,
    color: '#B3B3B3',
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
