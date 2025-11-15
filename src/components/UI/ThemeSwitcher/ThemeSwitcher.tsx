import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const isDarkTheme = theme === "dark";

  const { t } = useTranslation();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleChange = () => {
    setTheme((prevTheme) => {
      const result = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", result);
      return result;
    });
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="relative flex h-8 w-8">
      <button
        aria-label={t("ThemeSwitch_Label")}
        className="absolute z-10 h-full w-full rounded-full border-2 border-solid border-blue text-blue duration-100 hover:bg-slate-200 dark:bg-blue dark:text-white dark:hover:opacity-80"
        onClick={handleChange}
        aria-pressed={!isDarkTheme}
      >
        <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
      </button>
    </div>
  );
}
