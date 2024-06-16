// eslint-disable-next-line no-undef
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 检查是否处于生产环境模式
      if (webpackConfig.mode === "production") {
        // 确保 optimization 对象存在，如果不存在则创建一个空对象
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {};
        }
        // 配置 splitChunks 以便在生产环境中进行代码分割
        webpackConfig.optimization.splitChunks = {
          // 将应用程序中所有的 chunk 进行代码分割
          chunks: "all",
          cacheGroups: {
            // 创建 antd-chunk，用于包含 antd 相关代码
            antd: {
              name: "antd-chunk",
              test: /antd/, // 匹配包含 antd 的模块
              priority: 100, // 设置优先级，数字越大优先级越高
            },
            // 创建 reactDom-chunk，用于包含 react-dom 相关代码
            ReactDom: {
              name: "reactDom-chunk",
              test: /react-dom/, // 匹配包含 react-dom 的模块
              priority: 99, // 设置优先级，略低于 antd-chunk
            },
            // 创建 vendors-chunk，用于包含 node_modules 目录中的其他依赖
            vendors: {
              name: "vendors-chunk",
              test: /node_modules/, // 匹配包含 node_modules 的模块
              priority: 98, // 设置优先级，略低于 reactDom-chunk
            },
          },
        };
      }
      return webpackConfig;
    },
  },
  devServer: {
    port: 8000,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
};
