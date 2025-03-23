import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
    marginBottom: 16,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  boxSecret: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FFFFFF',
    height: 156,
    gap: 16,
    padding: 12,
  },
}));

export default useStyles;
