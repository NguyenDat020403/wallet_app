import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 16,
  },
  infoCoin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Regular: {
    ...typography.body2Regular,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading1: {
    ...typography.heading1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonViewMore: {
    backgroundColor: '#333333',
    borderRadius: 4,
    padding: 8,
    alignSelf: 'flex-start',
  },
}));

export default useStyles;
