import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', padding: 16},
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
  textBody3Bold: {
    ...typography.body3Bold,
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading2: {
    ...typography.heading2,
  },
  textHero: {
    ...typography.hero,
  },
  inputStyle: {
    marginVertical: 8,
    backgroundColor: '#777E9052',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
  },
  divider: {
    backgroundColor: '#B3B3B3',
    height: 0.5,
    width: '100%',
    marginVertical: 12,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
}));

export default useStyles;
