import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) return;

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
    }

    initialRender.current = false;
  }, []);

  useEffect(() => {
    if (initialRender.current) return;

    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleChange = () => {
    setIsDark((prevState) => !prevState);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="relative flex h-8 w-8">
      <label
        htmlFor="theme-switch"
        className="absolute z-10 flex h-full w-full items-center justify-center rounded-full border-2 border-solid border-blue duration-100 hover:cursor-pointer hover:bg-slate-300 dark:bg-blue"
      >
        <FontAwesomeIcon
          className="text-blue dark:text-white"
          icon={isDark ? faSun : faMoon}
        />
      </label>
      <input
        id="theme-switch"
        className="opacity-0"
        type="checkbox"
        checked={isDark}
        aria-label="theme switch"
        onChange={handleChange}
      />
    </div>
  );
};

export default ThemeSwitch;
