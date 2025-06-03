import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', position: 'relative'},

  textCap1: {
    ...typography.caption1,
    color: '#B3B3B3',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  imagesList: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.7,
    borderRadius: 12,
  },
  imageCountMore: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
}));

export default useStyles;
