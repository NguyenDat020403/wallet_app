import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  infoCoin: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textTitle2Bold: {
    ...typography.title2Bold,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBody1RegularBlack: {
    fontSize: 14,
    fontFamily: 'ibm_bold',
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
  },
  bottomContainer: {
    position: 'absolute',
    paddingTop: 12,
    paddingBottom: insets.bottom + 12,
    paddingHorizontal: 16,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    height: 0.5,
    alignSelf: 'center',
    width: insets.screenWidth - 64,
    backgroundColor: '#B3B3B3',
  },
  swapIcon: {
    position: 'absolute',
    padding: 8,
    borderRadius: 150,
    backgroundColor: '#000',
    zIndex: 100,
    alignSelf: 'center',
  },
}));

export default useStyles;
