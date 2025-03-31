import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const { notifications, removeNotification } = React.useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
      {notifications.map((notification) => {
        const { id, message, variant } = notification;
        return (
          <li className={styles.toastWrapper} key={id}>
            <Toast
              variant={variant}
              onClose={() => removeNotification(notification)}
            >
              {message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
