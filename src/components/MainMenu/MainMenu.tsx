import { useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import ClearButton from "../UI/ClearButton/ClearButton";
import InputField from "../UI/InputField/InputField";
import Logo from "../UI/Logo/Logo";
import classes from "./MainMenu.module.css";

const MainMenu = ({
  filterCandidates = (payload: string) => {},
  resetCandidates = () => {},
  addNewCandidate = () => {},
}) => {
  const [searchInput, setSearchInput] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterCandidates(e.target.value);
  };

  const resetHandler = () => {
    setSearchInput("");
    resetCandidates();
  };

  return (
    <div className={classes["main-menu-wrapper"]}>
      <Card className={classes["main-menu"]}>
        <Logo />
        <div className={classes["search-bar-wrapper"]}>
          <div className={classes["search-bar"]}>
            <InputField
              id="search-candidates"
              placeholder="Candidate name, skills"
              onChange={changeInputHandler}
              value={searchInput}
              inputClass={classes.input}
            />
            {searchInput.length > 0 && (
              <ClearButton
                onClick={resetHandler}
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
