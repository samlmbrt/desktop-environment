import { useEffect, useState } from "react";

export default function useViewport() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : null);
  const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : null);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
}
