import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  textRegular: {
    ...typography.body1Regular,
  },
  textMedium: {
    ...typography.body1Medium,
  },
  textSemiBold: {
    ...typography.body2SemiBold,
  },
  networkBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#777E9052',
  },
}));

export default useStyles;
