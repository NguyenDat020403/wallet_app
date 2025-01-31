import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  textViews: {
    ...typography.body2Medium,
    color: '#000000',
  },
  textButton: {
    ...typography.button1Light,
  },
}));

export default useStyles;
