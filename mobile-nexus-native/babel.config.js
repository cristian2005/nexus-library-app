module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],
    // El plugin de worklets debe ir SIEMPRE el último.
    // Lo necesita react-native-reanimated 4.x (que usa react-native-worklets).
    plugins: ["react-native-worklets/plugin"]
  };
};
