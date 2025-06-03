import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', position: 'relative'},
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Regular: {
    ...typography.body2Regular,
    opacity: 0.6,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading1: {
    ...typography.heading1,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center',
    marginBottom: 12,
  },
  icon: {
    borderRadius: 150,
    width: 28,
    height: 28,
  },
  backgroundIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 150,
  },
  iconHeader: {
    width: 24,
    height: 24,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    gap: 16,
    alignSelf: 'center',
    paddingVertical: 16,
  },
  addTokenComponent: {
    position: 'absolute',
    bottom: 80,
    gap: 8,
    elevation: 5,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
}));

export default useStyles;
