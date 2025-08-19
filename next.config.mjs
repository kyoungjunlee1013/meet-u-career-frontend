// next.config.mjs

let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import('./v0-user-next.config')
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 로컬 빌드 산출물을 EC2에 그대로 올려 실행
  output: 'standalone',

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    unoptimized: true,
    // 외부 이미지(서버 IP/도메인/로컬) 허용
    remotePatterns: [
      { protocol: 'http',  hostname: '43.200.182.200' },
      { protocol: 'https', hostname: 'meet-u-career.com' },
      { protocol: 'http',  hostname: 'localhost' },
      { protocol: 'http',  hostname: '127.0.0.1' },
    ],
  },

  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    // disableFileWatcher: true, // ❌ 유효하지 않은 키라 제거
  },
}

// 사용자 커스텀 설정 병합
if (userConfig) {
  const config = userConfig.default || userConfig
  for (const key in config) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = { ...nextConfig[key], ...config[key] }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
