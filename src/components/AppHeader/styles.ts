import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.paddingSM,
    paddingHorizontal: spacing.paddingMD,
    height: 40,
  },
  leftSide: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleStyle: {
    ...typography.body1Medium,
  },
  midSide: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.marginSM,
  },
  rightSide: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightTitle: {
    ...typography.buttonDefault,
    color: colors.primary,
    fontWeight: 'bold',
  },
}));

export default useStyles;
