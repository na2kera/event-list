import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// microCMSの登壇者型定義
export type SpeakerContent = {
  id: string;
  "speaker-id": string;
  "speaker-image": {
    url: string;
    height?: number;
    width?: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// microCMSクライアントの作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 登壇者一覧を取得する関数
export const getSpeakerList = async (queries?: MicroCMSQueries) => {
  const endpoint = process.env.MICROCMS_ENDPOINT || "speakers-images";
  const response = await client.getList<SpeakerContent>({
    endpoint,
    queries,
  });

  return response;
};

// 特定の登壇者を取得する関数
export const getSpeakerDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const endpoint = process.env.MICROCMS_ENDPOINT || "speakers-images";
  const response = await client.getListDetail<SpeakerContent>({
    endpoint,
    contentId,
    queries,
  });

  return response;
};
