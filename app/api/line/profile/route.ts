import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { access_token } = await request.json();

    if (!access_token) {
      return NextResponse.json(
        { message: "アクセストークンが必要です" },
        { status: 400 }
      );
    }

    // LINEプロフィール情報を取得
    const profileResponse = await fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error("LINEプロフィール取得エラー:", errorText);
      return NextResponse.json(
        { message: "LINEプロフィールの取得に失敗しました" },
        { status: 500 }
      );
    }

    const profileData = await profileResponse.json();

    // 友だち追加用のURLを追加
    // LINEボットのベーシックIDまたはチャネルID
    const lineBotId = process.env.NEXT_PUBLIC_LINE_BOT_BASIC_ID || "";
    const friendshipUrl = `https://line.me/R/ti/p/@${lineBotId}`;

    return NextResponse.json({
      userId: profileData.userId,
      displayName: profileData.displayName,
      pictureUrl: profileData.pictureUrl,
      statusMessage: profileData.statusMessage,
      friendshipUrl,
    });
  } catch (error) {
    console.error("LINEプロフィール取得エラー:", error);
    return NextResponse.json(
      { message: "LINEプロフィール取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
