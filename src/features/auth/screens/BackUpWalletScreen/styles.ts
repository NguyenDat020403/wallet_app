import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 16,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 8,
    height: 200,
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
}));

export default useStyles;
