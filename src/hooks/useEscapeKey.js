import React from "react";

function useEscapeKey(callback) {
  React.useEffect(() => {
    function onKeydown(e) {
      if (e.code === "Escape") {
        callback();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [callback]);
}

export default useEscapeKey;
