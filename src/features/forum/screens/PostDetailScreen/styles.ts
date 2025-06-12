import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBody1Bold: {
    ...typography.body1Bold,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  divider: {
    height: 0.5,
    width: insets.screenWidth,
    backgroundColor: '#0000003',
  },
  footer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopColor: '#b3b3b3',
    borderBottomColor: '#FFFF',
    borderWidth: 0.5,
  },
  commentBox: {
    backgroundColor: '#efefef',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  placeholderText: {
    color: '#5f5f5f',
    fontSize: 14,
  },
}));

export default useStyles;
