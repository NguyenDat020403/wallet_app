const alias = {
  '^@/(.+)': './src/\\1',
  '#/(.+)': './\\1',
}; // @/folder will be an alias to <root>/src/folder
const extensions = [
  '.android.js',
  '.ios.js',
  '.js',
  '.json',
  '.native',
  '.ios.ts',
  '.android.ts',
  '.ts',
  '.ios.tsx',
  '.android.tsx',
  '.tsx',
  '.jsx',
  '.js',
  '.json',
];
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {alias, extensions}],
    'react-native-reanimated/plugin',
  ],
};
