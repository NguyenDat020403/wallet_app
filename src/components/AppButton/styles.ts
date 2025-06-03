import {typography} from '@/styles';
import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  button: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
  },
  textButton: {
    ...typography.body3Medium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
}));

export default useStyles;
