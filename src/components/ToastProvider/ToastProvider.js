import React from "react";

export const ToastContext = React.createContext({});

export function ToastProvider({ children }) {
  const [notifications, setNotifications] = React.useState(() => {
    return [];
  });

  const removeNotification = React.useCallback(
    (notificationToRemove) => {
      setNotifications((notifications) =>
        notifications.filter(
          (notification) => notification !== notificationToRemove
        )
      );
    },
    [setNotifications]
  );

  const appendNotification = React.useCallback(
    ({ variant, message }) => {
      const key = window.crypto.randomUUID();
      setNotifications((notifications) => [
        ...notifications,
        { key, variant, message },
      ]);
    },
    [setNotifications]
  );

  const context = {
    notifications,
    appendNotification,
    removeNotification,
  };

  return (
    <ToastContext.Provider value={context}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
