// バックエンドAPIのベースURL（クライアントサイドでは環境変数から取得）
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
