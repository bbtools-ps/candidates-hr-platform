import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ClearButton from "../ClearButton/ClearButton";
import InputField from "../InputField/InputField";
import Logo from "../Logo/Logo";
import classes from "./MainMenu.module.css";

interface IMainMenuProps {
  onResetCandidates: () => void;
  onAddNewCandidate: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

const MainMenu: React.FC<IMainMenuProps> = ({
  onResetCandidates,
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
      className={classes["main-menu-wrapper"]}
    >
      <Card className={classes["main-menu"]}>
        <Logo />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -30 },
            show: { opacity: 1, y: 0 },
          }}
          className={classes["search-bar-wrapper"]}
        >
          <div className={classes["search-bar"]}>
            <InputField
              id="search-candidates"
              placeholder="Search candidate name, skills"
              onChange={onChange}
              value={searchInput}
              inputClass={classes.input}
              data-cy="search-candidates"
            />
            <AnimatePresence>
              {searchInput.length > 0 && (
                <ClearButton
                  onClick={onResetCandidates}
                  className={classes["clear-button"]}
                  data-cy="clear-btn"
                />
              )}
            </AnimatePresence>
          </div>
          <Button
            text="Add Candidate"
            icon="add"
            onClick={onAddNewCandidate}
            data-cy="add-candidate-btn"
          />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default MainMenu;
