import { NextRequest, NextResponse } from "next/server";

// LINE認証用の設定
const LINE_CLIENT_ID = process.env.NEXT_PUBLIC_LINE_CLIENT_ID || "";
const LINE_CLIENT_SECRET = process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET || "";
// リダイレクトURIはLINE Developersコンソールに登録されているものと一致させる
const LINE_REDIRECT_URI =
  process.env.NEXT_PUBLIC_LINE_REDIRECT_URI ||
  "http://localhost:3000/line-connect";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { message: "認証コードが必要です" },
        { status: 400 }
      );
    }

    // LINEトークンを取得
    const tokenResponse = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: LINE_REDIRECT_URI,
        client_id: LINE_CLIENT_ID,
        client_secret: LINE_CLIENT_SECRET,
      } as Record<string, string>),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("LINEトークン取得エラー:", errorText);
      return NextResponse.json(
        { message: "LINEトークンの取得に失敗しました" },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();

    return NextResponse.json(tokenData);
  } catch (error) {
    console.error("LINE認証エラー:", error);
    return NextResponse.json(
      { message: "LINE認証処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
