"use client";
import { useEffect, useState } from "react";

/**
 * パーミッション状態を取得するカスタムフック
 * @returns {NotificationPermission} - パーミッション状態
 */
const useNotificationPermissionStatus = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  useEffect(() => {
    const handler = () => setPermission(Notification.permission);
    handler();
    Notification.requestPermission().then(handler);
    navigator.permissions
      .query({ name: "notifications" })
      .then((notificationPerm) => {
        notificationPerm.onchange = handler;
      });
  }, []);
  return permission;
};

export default useNotificationPermissionStatus;
