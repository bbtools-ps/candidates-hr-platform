import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Sidebar from "../Sidebar/Sidebar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

interface MainMenuProps {
  onAddNewCandidate: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

export default function MainMenu({
  onAddNewCandidate,
  onChange,
  searchInput,
}: MainMenuProps) {
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
      <Logo />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          show: { opacity: 1, y: 0 },
        }}
        className="flex flex-1 items-center justify-between gap-2 md:gap-4"
      >
        <div className="relative flex-1">
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
        <Button
          icon="add"
          onClick={onAddNewCandidate}
          data-cy="add-candidate-btn"
        >
          {t("AddCandidate_Label")}
        </Button>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <Sidebar>
          <Sidebar.Trigger>
            <Button
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-blue bg-transparent p-0 text-blue dark:border-none dark:bg-blue dark:text-white lg:hidden"
              aria-label={t("Settings_Label")}
            >
              <FontAwesomeIcon icon={faGear} />
            </Button>
          </Sidebar.Trigger>
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
