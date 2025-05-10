import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginVertical: spacing.marginSM,
  },
  titleWrap: {
    flexDirection: 'row',
    marginBottom: spacing.marginSM,
  },
  title: {
    ...typography.body1Regular,
    marginRight: spacing.marginXS,
  },
  required: {
    ...typography.button2Bold,
    color: colors.error,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#777E9052',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
  },
  inputError: {
    backgroundColor: `${colors.error}29`,
    borderWidth: 1,
    borderColor: colors.error,
  },
  inputText: {
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    ...typography.body1Regular,
    zIndex: 1,
  },
  error: {
    fontSize: 12,
    fontWeight: '300',
    marginTop: spacing.marginSM,
    color: colors.error,
  },
  eye: {
    fontSize: 20,
    color: `${colors.primary}50`,
  },
  eyeContainer: {
    right: 10,
  },
}));

export default useStyles;
