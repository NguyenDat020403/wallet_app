import {AppEdgeInsets} from '#/src/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    width: insets.screenWidth - 32,
    borderRadius: 19,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconWarning: {
    backgroundColor: '#FFFFFF',
    borderRadius: 150,
    width: 80,
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    top: -40,
    elevation: 10,
  },
  textWarning: {
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 56,
    fontFamily: 'nunito_medium',
    fontSize: 18,
    lineHeight: 26,
  },
  buttonStyle: {
    marginVertical: 16,
    width: 200,
    backgroundColor: '#202020',
  },
}));

export default useStyles;
