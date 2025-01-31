import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#000000',
    borderRadius: 9,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  iconPlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  liveFlag: {
    position: 'absolute',
    top: 4,
    left: 3,
    zIndex: 100,
    backgroundColor: '#08C514',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 7,
  },
  textLive: {
    ...typography.caption1Medium,
    color: '#FFFFFF',
  },
}));

export default useStyles;
