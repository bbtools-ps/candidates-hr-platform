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
      <label
        htmlFor="theme-switch"
        className="absolute z-10 flex h-full w-full items-center justify-center rounded-full border-2 border-solid border-blue text-blue duration-100 hover:cursor-pointer hover:bg-slate-200 dark:bg-blue dark:text-white dark:hover:opacity-80"
      >
        <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
        <span className="sr-only">{t("ThemeSwitch_Label")}</span>
      </label>
      <input
        id="theme-switch"
        className="opacity-0"
        type="checkbox"
        checked={isDarkTheme}
        onChange={handleChange}
      />
    </div>
  );
}
