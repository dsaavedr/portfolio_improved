"use client";

import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  // *Window width minus scrollbar
  //  document.clientHeight is 0 on load, so we still need to get the height from the window.
  const { clientWidth: width } = document.body;
  const { innerHeight: height } = window;
  return [width, height];
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
