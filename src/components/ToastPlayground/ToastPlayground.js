import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const { appendNotification } = React.useContext(ToastContext);

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (message === "") {
        return;
      }
      appendNotification({ variant, message });
      setMessage("");
      setVariant(VARIANT_OPTIONS[0]);
    },
    [variant, message, setMessage, appendNotification]
  );

  const onMessageChange = React.useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  const onVariantChange = React.useCallback(
    (e) => {
      setVariant(e.target.value);
    },
    [setVariant]
  );

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={onMessageChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <fieldset className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantOption) => (
              <label htmlFor={variantOption} key={variantOption}>
                <input
                  id={variantOption}
                  type="radio"
                  name="variant"
                  value={variantOption}
                  checked={variantOption === variant}
                  onChange={onVariantChange}
                />
                {variantOption}
              </label>
            ))}
          </fieldset>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button disabled={message === ""}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
