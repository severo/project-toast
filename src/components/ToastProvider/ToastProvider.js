import React from "react";

export const ToastContext = React.createContext({});

export function ToastProvider({ children }) {
  const [notifications, setNotifications] = React.useState(() => {
    return [];
  });

  const removeNotification = React.useCallback(
    (id) => {
      setNotifications((notifications) => {
        return notifications.filter((notification) => notification.id !== id);
      });
    },
    [setNotifications]
  );

  const appendNotification = React.useCallback(
    ({ variant, message }) => {
      const id = window.crypto.randomUUID();
      setNotifications((notifications) => [
        ...notifications,
        { id, variant, message },
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
