"use client";
import { useEffect, useState } from "react";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/lib/firebaseConfig";
import useNotificationPermissionStatus from "@/utils/hooks/useNotificationPermissionStatus";

/**
 * FCMトークンを取得するカスタムフック
 * @returns {string | null} - FCMトークン
 */
const useFCMToken = () => {
  const permission = useNotificationPermissionStatus();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (permission === "granted") {
          const isFCMSupported = await isSupported();
          if (!isFCMSupported) return;
          const fcmMessaging = messaging();
          if (fcmMessaging) {
            const fcmToken = await getToken(fcmMessaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });
            setFcmToken(fcmToken);
          }
        }
      }
    };
    retrieveToken();
  }, [permission]);
  return fcmToken;
};

export default useFCMToken;
