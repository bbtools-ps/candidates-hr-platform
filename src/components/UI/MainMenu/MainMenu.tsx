import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import SearchForm from "@/components/SearchForm/SearchForm";
import { faGear, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Sidebar from "../Sidebar/Sidebar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import ToggleFavoriteButton from "../ToggleFavoriteButton/ToggleFavoriteButton";

export default function MainMenu() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const isFavorite = searchParams.get("isFavorite") === "true";
  const [defaultSearchTerm, setDefaultSearchTerm] = useState<string>();
  const searchTerm = defaultSearchTerm ?? (searchParams.get("q") || "");

  const handleToggleFavorite = () => {
    setSearchParams((prevParams) => ({
      ...Object.fromEntries(prevParams.entries()),
      isFavorite: String(!isFavorite),
    }));
  };

  const updateSearchParams = (newSearchTerm: string) => {
    setSearchParams({
      ...(newSearchTerm ? { q: newSearchTerm } : {}),
      isFavorite: String(isFavorite),
    });
  };

  const [isLogoClicked, setIsLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setDefaultSearchTerm("");
    setIsLogoClicked((prev) => !prev);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate="show"
      className="flex w-full items-center justify-center gap-4 bg-white px-4 py-4 dark:border dark:border-solid dark:border-b-slate-600 dark:bg-slate-900 lg:gap-6 lg:px-6"
    >
      <div className="hidden lg:block">
        <Logo onClick={handleLogoClick} />
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          show: { opacity: 1, y: 0 },
        }}
        className="flex w-full flex-1 flex-col-reverse items-center justify-between gap-4 lg:flex-row"
      >
        <SearchForm
          key={isLogoClicked ? "logo-clicked" : "logo-not-clicked"}
          label={t("Candidates_Label")}
          placeholder={t("SearchCandidatesPlaceholder_Label")}
          clearButtonLabel={t("ClearSearchInput_Label")}
          defaultValue={searchTerm}
          onChange={updateSearchParams}
        />
        <Sidebar>
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
            <div className="block lg:hidden">
              <Logo onClick={handleLogoClick} />
            </div>
            <div className="flex items-center gap-4">
              <ToggleFavoriteButton
                className="h-7 w-7 p-0"
                label={t("ShowFavorites_Label")}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
              />
              <Link
                to="/new-candidate"
                data-cy="add-candidate-btn"
                className="link-button"
                aria-label={t("AddCandidate_Label")}
              >
                <FontAwesomeIcon icon={faUserPlus} className="lg:mr-2" />
                <span className="hidden sm:inline-block" aria-hidden="true">
                  {t("AddCandidate_Label")}
                </span>
              </Link>
              <div className="hidden items-center gap-4 lg:flex">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              <Sidebar.Trigger>
                <Button
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-blue bg-transparent p-0 text-blue dark:border-none dark:bg-blue dark:text-white lg:hidden"
                  aria-label={t("Settings_Label")}
                >
                  <FontAwesomeIcon icon={faGear} />
                </Button>
              </Sidebar.Trigger>
            </div>
          </div>
          <Sidebar.Content
            title={t("Settings_Label")}
            closeSidebarLabel={t("CloseSidebar_Label")}
          >
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span>{t("Theme_Label")}</span>
                <ThemeSwitcher />
              </div>
              <div className="flex items-center gap-4">
                <span>{t("Language_Label")}</span>
                <LanguageSwitcher />
              </div>
            </div>
          </Sidebar.Content>
        </Sidebar>
      </motion.div>
    </motion.div>
  );
}
