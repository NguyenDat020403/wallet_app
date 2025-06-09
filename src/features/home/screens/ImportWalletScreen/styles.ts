import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBoxWord: {
    ...typography.body1Regular,
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 0.5,
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
    borderColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
}));

export default useStyles;
