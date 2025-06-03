import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 12,
  },
  icons: {
    width: 24,
    height: 24,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textCap1: {
    ...typography.caption1,
  },
}));

export default useStyles;
