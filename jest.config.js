module.exports = {
  preset: 'react-native',
  // Inline, so the lib ships no Babel config the example app's Metro could pick up.
  // Same key as the preset's, which replaces its config-less babel-jest entry.
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      'babel-jest',
      { presets: ['module:@react-native/babel-preset'] },
    ],
  },
  // rn-country-select resolves to its TypeScript source under the `react-native` export
  // condition, and the safe-area-context mock is TSX: both go through Babel.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context|rn-country-select)/)',
  ],
  setupFiles: ['./jest.setup.js'],
  // The first render in each component file loads React Native, which takes ~2.5x
  // longer on GitHub runners than locally and can brush the 5 s default.
  testTimeout: 15000,
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
};
