import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textSecondTitle: {
    ...typography.title2Bold,
    color: '#202020',
  },
  textMoreInfo: {
    ...typography.body2Bold,
    color: '#000000',
  },
  iconArrowRight: {
    backgroundColor: '#004CFF',
    width: 30,
    height: 30,
    borderRadius: 150,
    justifyContent: 'center',
    marginLeft: 12,
  },
  leftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
}));

export default useStyles;
