import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    width: insets.screenWidth - 32,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
  textBody3Regular: {
    textAlign: 'center',
    ...typography.body3Regular,
  },
  textBody2Regular: {
    textAlign: 'center',
    ...typography.body2Regular,
    opacity: 0.6,
  },
  buttonStyle: {
    width: '90%',
    marginVertical: 16,
    backgroundColor: '#FFFFFF',
  },
}));

export default useStyles;
