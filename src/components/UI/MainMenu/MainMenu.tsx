import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

interface IProps {
  onAddNewCandidate: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

export default function MainMenu({
  onAddNewCandidate,
  onChange,
  searchInput,
}: IProps) {
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
          <label className="sr-only" htmlFor="search-candidates">
            Search Candidates
          </label>
          <input
            id="search-candidates"
            className="w-full truncate rounded-full border-2 border-solid border-gray bg-transparent py-2 pl-10 pr-4 text-lg duration-200 hover:border-blue focus:w-full dark:border-slate-600 dark:text-white dark:hover:border-blue xl:w-1/2"
            placeholder="Search candidate name, skills"
            data-cy="search-candidates"
            onChange={onChange}
            value={searchInput}
          />
        </div>
        <Button
          icon="add"
          onClick={onAddNewCandidate}
          data-cy="add-candidate-btn"
        >
          Add Candidate
        </Button>
        <ThemeSwitch />
      </motion.div>
    </motion.div>
  );
}
