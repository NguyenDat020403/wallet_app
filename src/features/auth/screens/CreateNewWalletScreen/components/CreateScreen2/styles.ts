import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'space-between',
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
    marginBottom: 16,
  },
}));

export default useStyles;
