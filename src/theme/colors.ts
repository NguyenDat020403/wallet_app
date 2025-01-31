const colors = {
  primary: ['#009AFF', '#009AFF'],
  primary700: ['#027DEA', '#027DEA'],
  primary950: ['#0E355D', '#0E355D'],
  warning600: ['#FFAD0D', '#FFAD0D'],
  warning700: ['#FE9B0E', '#FE9B0E'],
  success600: ['#47B881', '#47B881'],
  background: ['#000024', '##FFF'],
  textPrimary: ['#FFFFFF', '#000000'],
  textTeriary: ['#B2BBC7', '#B2BBC7'],
  textSecondary: ['#9196A6', '#FCFCFD'],
  lineGray400: ['#9196A6', '#9196A6'],
  neutral: ['#5F6475', '#5F6475'],
  neutral100: ['#E4E5E9', '#E4E5E9'],
  neutral200: ['#C8CBD3', '#C8CBD3'],
  neutral400: ['#9196A6', '#9196A6'],
  neutral800: ['#32353E', '#32353E'],
  textBlue: ['#009AFF', '#009AFF'],
  increase: '#0C9D61',
  decrease: '#EC2D30',
  warning400: '#FFDD82',
  violet400: '#A391F4',
  primary400: '#4AD4FF',
  blackBackdrop: ['#000000cc', '#000000cc'],
  while10: ['#ffffff1a', '#ffffff1a'],
};

const darkColors: {[x: string]: string} = {
  a: '#000000',
};
const lightColors: {[x: string]: string} = {
  a: '#000000',
};

Object.entries(colors).map(([key, val]) => {
  darkColors[key] = val[0];
  lightColors[key] = val[1];
});

export {darkColors, lightColors, colors};
