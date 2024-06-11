// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
};
