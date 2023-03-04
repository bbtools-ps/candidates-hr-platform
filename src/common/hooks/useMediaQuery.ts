import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [isMatched, setIsMatched] = useState<boolean>(false);

  useEffect(() => {
    const updateTarget = (e: MediaQueryListEvent) => {
      setIsMatched(e.matches);
    };

    const media = window.matchMedia(query);
    media.addEventListener("change", updateTarget);

    // Initially set the state
    setIsMatched(media.matches);

    return () => {
      media.removeEventListener("change", updateTarget);
    };
  }, [query]);

  return isMatched;
};

export default useMediaQuery;
