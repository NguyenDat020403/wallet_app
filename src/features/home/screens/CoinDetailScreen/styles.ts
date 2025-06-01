import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 16,
  },
  infoCoin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Medium: {
    ...typography.body2Medium,
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
  textHeading1: {
    ...typography.heading1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 4,
    padding: 8,
    alignSelf: 'flex-start',
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
}));

export default useStyles;
