import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody3Medium: {
    ...typography.body3Medium,
  },
  textBody2Regular: {
    ...typography.body2Regular,
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
  textBoxWord: {
    ...typography.body1Regular,
    borderColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  boxPaste: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    borderWidth: 0.5,
    borderColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
}));

export default useStyles;
