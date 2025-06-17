import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  noTokenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingTop: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Regular: {
    ...typography.body2Regular,
    opacity: 0.6,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading1: {
    ...typography.heading1,
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: 150,
  },
  leftCoinItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  iconFind: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 24,
    left: 12,
  },
}));

export default useStyles;
