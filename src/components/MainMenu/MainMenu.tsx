import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import ClearButton from "../UI/ClearButton/ClearButton";
import InputField from "../UI/InputField/InputField";
import Logo from "../UI/Logo/Logo";
import classes from "./MainMenu.module.css";

interface MainMenuProps {
  resetCandidates: () => void;
  addNewCandidate: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

const MainMenu: React.FC<MainMenuProps> = ({
  resetCandidates,
  addNewCandidate,
  onChange,
  searchInput,
}) => {
  return (
    <div className={classes["main-menu-wrapper"]}>
      <Card className={classes["main-menu"]}>
        <Logo />
        <div className={classes["search-bar-wrapper"]}>
          <div className={classes["search-bar"]}>
            <InputField
              id="search-candidates"
              placeholder="Search candidate name, skills"
              onChange={onChange}
              value={searchInput}
              inputClass={classes.input}
            />
            {searchInput.length > 0 && (
              <ClearButton
                onClick={resetCandidates}
                className={classes["clear-button"]}
              />
            )}
          </div>
          <Button text="Add Candidate" icon="add" onClick={addNewCandidate} />
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;
