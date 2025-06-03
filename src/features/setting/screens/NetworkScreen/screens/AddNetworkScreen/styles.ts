import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: '#0000003',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
    marginTop: 3,
  },
  textRegular: {
    ...typography.body1Regular,
  },
  textSemiBold: {
    ...typography.body2SemiBold,
  },
  textCap: {
    ...typography.caption1,
  },
  boxTestnet: {
    height: 24,
    flexDirection: 'row',
    width: 24,
    borderWidth: 1,
    borderRadius: 150,
    justifyContent: 'center',
  },
  testnetFirmed: {
    alignSelf: 'center',
    borderRadius: 150,
    width: 14,
    height: 14,
    backgroundColor: '#804FB0',
  },
}));

export default useStyles;
