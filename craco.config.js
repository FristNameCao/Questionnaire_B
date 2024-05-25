// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
};
