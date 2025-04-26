import i18next from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "sr", name: "Srpski" },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <label htmlFor="language-switcher" className="sr-only">
        {t("LanguageSwitch_Label")}
      </label>
      <select
        id="language-switcher"
        className="bg-transparent p-2 dark:text-white"
        defaultValue={i18next.resolvedLanguage}
        onChange={handleChange}
      >
        {LANGUAGES.map(({ code, name }) => (
          <option
            key={code}
            value={code}
            className="dark:bg-slate-900 dark:text-white"
          >
            {name}
          </option>
        ))}
      </select>
    </>
  );
}
