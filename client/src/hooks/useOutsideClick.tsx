
import { useEffect } from "react";

const useOutsideClick = (ref: React.RefObject<HTMLElement>, onOutsideClick: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    // @ts-ignore
    if (ref.current && !event?.srcElement?.classList?.contains("child")!) {
      onOutsideClick();
    }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
