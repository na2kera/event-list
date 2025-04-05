"use client";
import useFCM from "@/utils/hooks/useFCM";

export default function Home() {
  const { messages, fcmToken } = useFCM();
  console.log(`messages:`, messages);
  return (
    <div>
      <p>fcmToken: {fcmToken}</p>
      <p>messages: {JSON.stringify(messages)}</p>
    </div>
  );
}
