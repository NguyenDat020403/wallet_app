import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#0F0F0F', position: 'relative'},
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
    width: 32,
    height: 32,
  },
  backgroundIcon: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#804FB0',
    borderRadius: 150,
  },
  iconHeader: {
    width: 28,
    height: 28,
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
    backgroundColor: '#804FB0',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
}));

export default useStyles;
