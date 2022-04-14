import React, { useEffect } from "react";

export default function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  callBack?: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && callBack) callBack();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callBack, ref]);
}
