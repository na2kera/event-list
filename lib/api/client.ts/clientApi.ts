// バックエンドAPIのベースURL（クライアントサイドでは環境変数から取得）
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_INTERNAL_API_URL ||
  "http://event-list-backend:3001/api";
