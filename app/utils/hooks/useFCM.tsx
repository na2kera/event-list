import { useEffect, useState } from "react";
import useFCMToken from "@/utils/hooks/useFCMToken";
import { messaging } from "@/lib/firebaseConfig";
import { MessagePayload, onMessage } from "firebase/messaging";

/**
 * FCM通知を処理するカスタムフック
 * @returns {Object} - { fcmToken, messages }
 */
const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmMessaging = messaging();
      if (fcmMessaging) {
        const unsubscribe = onMessage(fcmMessaging, (payload) => {
          setMessages((messages) => [...messages, payload]);
        });
        return () => unsubscribe();
      }
    }
  }, [fcmToken]);

  return { fcmToken, messages };
};

export default useFCM;
