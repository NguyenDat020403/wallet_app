import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 16,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#201927',
    borderWidth: 1,
    borderColor: '#804FB0',
    borderRadius: 4,
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
  button: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#0F0F0F',
  },
}));

export default useStyles;
