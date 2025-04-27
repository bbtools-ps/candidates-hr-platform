import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import {
  faGear,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Sidebar from "../Sidebar/Sidebar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

interface MainMenuProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

export default function MainMenu({ onChange, searchInput }: MainMenuProps) {
  const { t } = useTranslation();

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
        <Logo />
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          show: { opacity: 1, y: 0 },
        }}
        className="flex w-full flex-1 flex-col-reverse items-center justify-between gap-4 lg:flex-row"
      >
        <div className="relative w-full flex-1 lg:w-auto">
          <span className="absolute left-4 flex h-full items-center text-gray">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <form role="search" aria-label={t("Candidates_Label")}>
            <input
              aria-label={t("Candidates_Label")}
              id="search-candidates"
              className="w-full truncate rounded-full border-2 border-solid border-gray bg-transparent py-2 pl-10 pr-4 text-lg duration-200 hover:border-blue focus:w-full dark:border-slate-600 dark:text-white dark:hover:border-sky-400 xl:w-1/2"
              placeholder={t("SearchCandidatesPlaceholder_Label")}
              data-cy="search-candidates"
              onChange={onChange}
              value={searchInput}
            />
          </form>
        </div>
        <Sidebar>
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
            <div className="block lg:hidden">
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/new-candidate"
                data-cy="add-candidate-btn"
                className="link-button"
              >
                <FontAwesomeIcon icon={faUserPlus} className="lg:mr-2" />
                <span className="hidden sm:inline-block">
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
