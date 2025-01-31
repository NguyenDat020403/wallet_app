import {createTheme} from '@rneui/themed';
import {lightColors, darkColors} from './colors';
export const theme = createTheme({
  lightColors,
  darkColors,
  mode: 'dark',
  components: {
    Text: (colors: any) => {
      return {
        style: {
          color: colors.textPrimary,
          fontFamily: 'Inter',
        },
      };
    },
    Button: {
      style: {backgroundColor: 'transparent'},
      containerStyle: {backgroundColor: 'transparent'},
      buttonStyle: {backgroundColor: 'transparent'},
      titleStyle: {
        fontFamily: 'Inter',
        paddingVertical: 0,
        includeFontPadding: false,
        fontSize: 16,
      },
    },
    Input: {
      inputContainerStyle: {borderBottomWidth: 0},
    },
    Overlay: {
      overlayStyle: {
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
      },
    },
    Tab: {
      buttonStyle: {padding: 0, paddingHorizontal: 0},
    },
    Slider: {
      style: {
        marginBottom: -10,
      },
    },
  },
});
