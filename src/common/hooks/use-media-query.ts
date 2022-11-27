import { useEffect, useState } from "react";

const useMediaQuery = (minWidth: number) => {
  const [result, setResult] = useState(window.innerWidth >= minWidth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= minWidth) {
        setResult(true);
      } else {
        setResult(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minWidth]);

  return result;
};

export default useMediaQuery;
