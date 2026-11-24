import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === "dark";

  return (
    <div className="relative flex h-8 w-8">
      <button
        type="button"
        role="switch"
        aria-checked={isDarkTheme}
        aria-label={t(
          isDarkTheme ? "SwitchToLightTheme_Label" : "SwitchToDarkTheme_Label"
        )}
        className="border-blue text-blue dark:bg-blue absolute z-10 h-full w-full rounded-full border-2 border-solid duration-100 hover:bg-slate-200 dark:text-white dark:hover:opacity-80"
        onClick={toggleColorScheme}
      >
        <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} />
      </button>
    </div>
  );
}
