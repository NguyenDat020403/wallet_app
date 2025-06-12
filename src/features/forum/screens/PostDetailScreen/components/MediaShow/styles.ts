import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    margin: 0,
    position: 'relative',
    alignSelf: 'center',
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBody1Bold: {
    ...typography.body1Bold,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  iconClose: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 150,
    position: 'absolute',
    top: insets.top + 16,
    right: 16,
  },
  dot: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 16,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
}));

export default useStyles;
