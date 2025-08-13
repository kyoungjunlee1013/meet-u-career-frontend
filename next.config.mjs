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
  // 로컬 빌드 산출물을 EC2에 그대로 올려 실행하기 위한 설정
  output: 'standalone',

  async rewrites() {
    return [
      // 개발/내부용 백엔드
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
      // 배포용 API 게이트웨이
      {
        source: '/api/:path*',
        destination: 'https://api.meet-u-career.com/api/:path*',
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    disableFileWatcher: true,
  },
}

// 사용자 커스텀 설정 병합
if (userConfig) {
  const config = userConfig.default || userConfig
  for (const key in config) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
