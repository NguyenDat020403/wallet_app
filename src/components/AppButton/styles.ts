import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  textButton: {
    ...typography.body3Medium,
    color: '#0F0F0F',
    textAlign: 'center',
  },
}));

export default useStyles;
