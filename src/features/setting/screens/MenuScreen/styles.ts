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
  setting: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
    paddingBottom: 24,
    paddingTop: 16,
  },
  divider: {
    marginLeft: 8,
    alignSelf: 'center',
    flexGrow: 1,
    height: 0.5,
    backgroundColor: '#000',
  },
}));

export default useStyles;
