import { useEffect, useRef } from "react";

export function useOutsideClick(handleFunction, listenCapturing = true){
    const ref = useRef()
  useEffect(() => {
    function handleClick(e) {
      if(ref.current && !ref.current.contains(e.target)) handleFunction();
      console.log(e.target);
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () => document.removeEventListener("click", handleClick, listenCapturing); // parameter true is important for bubble up
  }, [handleFunction, listenCapturing]);
  return ref;
}