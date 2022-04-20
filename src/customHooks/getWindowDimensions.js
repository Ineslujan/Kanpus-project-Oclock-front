import { useEffect, useState } from "react";

function getWindowDimensions() {
  const width = document.getElementsByTagName("body")[0].clientWidth
  const height = document.getElementsByTagName("body")[0].clientHeight
  return {
    width, height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}