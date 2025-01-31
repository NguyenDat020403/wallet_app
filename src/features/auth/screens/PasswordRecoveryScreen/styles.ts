import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', position: 'relative'},
  body: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  title: {
    fontFamily: 'nunito_bold',
    fontSize: 21,
    lineHeight: 30,
    color: '#202020',
  },
  desc: {
    fontFamily: 'nunito_light',
    fontSize: 19,
    lineHeight: 27,
    color: '#000000',
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  phone: {
    fontFamily: 'nunito_bold',
    fontSize: 19,
    lineHeight: 27,
    color: '#000000',
    marginTop: 16,
  },
  box: {flexDirection: 'column', marginVertical: 24, gap: 8},
  boxCheck: {
    position: 'relative',
    backgroundColor: '#E5EBFC',
    width: 200,
    height: 40,
    borderRadius: 18,
    justifyContent: 'center',
  },
  textBox: {
    alignSelf: 'center',
    fontFamily: 'nunito_bold',
    fontSize: 15,
    lineHeight: 19,
    color: '#004CFF',
  },
  iconCheck: {
    position: 'absolute',
    right: 8,
    alignItems: 'center',
  },
  otpCodeContainer: {
    justifyContent: 'space-between',
    width: (insets.screenWidth / 3) * 2,
  },
  textInput: {
    fontFamily: 'nunito_medium',
    fontSize: 17,
    lineHeight: 21,
    color: '#DCDCDC',
    backgroundColor: '#F8F8F8',
    width: insets.screenWidth - 32,
    textAlign: 'center',
    borderRadius: 9,
  },
}));

export default useStyles;
