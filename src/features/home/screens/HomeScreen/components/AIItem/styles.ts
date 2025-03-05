import {AppEdgeInsets} from '#/src/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    width: (insets.screenWidth - 32 - 16) / 2,
    height: (insets.screenWidth - 32 - 16) / 2,
    marginRight: 16,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'nunito_bold',
  },
}));

export default useStyles;
