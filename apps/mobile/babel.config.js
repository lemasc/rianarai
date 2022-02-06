module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxRuntime: 'automatic',
        },
      ],
    ],
    plugins: [
      [
        'inline-dotenv',
        {
          path: '../../.env',
          unsafe: true,
          systemVar: 'disable',
        },
        'root',
      ],
      [
        'inline-dotenv',
        {
          unsafe: true,
          systemVar: 'disable',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
