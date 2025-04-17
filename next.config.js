/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.microcms-assets.io', 'images.unsplash.com'],
  },
  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      // クライアントサイドのビルド時に環境変数を注入
      config.plugins.push(
        new webpack.DefinePlugin({
          'self.firebaseConfig': JSON.stringify({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          })
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
