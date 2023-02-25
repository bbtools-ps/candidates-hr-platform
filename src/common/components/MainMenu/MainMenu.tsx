import Button from "../Button/Button";
import Card from "../Card/Card";
import ClearButton from "../ClearButton/ClearButton";
import InputField from "../InputField/InputField";
import Logo from "../Logo/Logo";
import classes from "./MainMenu.module.css";

interface MainMenuProps {
  onResetCandidates: () => void;
  onAddNewCandidate: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onResetCandidates,
  onAddNewCandidate,
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
                onClick={onResetCandidates}
                className={classes["clear-button"]}
              />
            )}
          </div>
          <Button text="Add Candidate" icon="add" onClick={onAddNewCandidate} />
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;
