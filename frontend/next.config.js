/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.resolve.fallback = {
      "tfhe_bg.wasm": require.resolve("tfhe/tfhe_bg.wasm"),
    };
    return config;
  },
};
