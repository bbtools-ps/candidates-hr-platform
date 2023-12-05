import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

interface IMainMenuProps {
  onAddNewCandidate: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

const MainMenu: React.FC<IMainMenuProps> = ({
  onAddNewCandidate,
  onChange,
  searchInput,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate="show"
      className="bg-white z-10 flex w-full items-center justify-center gap-6 px-6 py-4 shadow-md"
    >
      <Logo />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          show: { opacity: 1, y: 0 },
        }}
        className="flex flex-1 justify-between gap-4"
      >
        <div className="relative flex-1">
          <span className="text-gray absolute left-4 flex h-full items-center">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            id="search-candidates"
            className="border-gray w-full truncate rounded-full border-2 border-solid py-2 pl-10 pr-4 text-lg duration-200 hover:border-blue focus:w-full focus:outline-blue xl:w-1/2"
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
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;
