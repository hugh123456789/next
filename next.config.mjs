/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保静态生成正常工作
  experimental: {
    // 如果需要，可以启用静态导出
    // output: 'export'
  },
  // 生产环境优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;
