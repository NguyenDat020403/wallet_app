import {AppEdgeInsets} from '#/src/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    paddingTop: 16,
  },
  textViews: {
    ...typography.body2Medium,
    color: '#000000',
  },
  shopButton: {
    flex: 1,
    paddingVertical: 6,
    marginHorizontal: 0,
  },
  textButton: {
    ...typography.button1Light,
  },
  image: {
    borderRadius: 9,
    width: insets.screenWidth - 32,
    height: insets.screenHeight - insets.top - insets.bottom - 60 - 40 - 32,
  },
  detail: {
    position: 'absolute',
    zIndex: 100,
    bottom: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 12,
    alignItems: 'center',
  },
  views: {
    flexDirection: 'row',
    gap: 4,
  },
}));

export default useStyles;
