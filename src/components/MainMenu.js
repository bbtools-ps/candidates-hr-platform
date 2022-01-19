import { useState } from "react";
import InputField from "./UI/InputField";
import Button from "./UI/Button";
import Card from "./UI/Card";

const MainMenu = ({
  filterCandidates = () => {},
  resetCandidates = () => {},
  addNewCandidate = () => {},
}) => {
  const [searchInput, setSearchInput] = useState("");

  const changeInputHandler = (e) => {
    setSearchInput(e.target.value);
    filterCandidates(e.target.value);
  };

  const resetHandler = () => {
    setSearchInput("");
    resetCandidates();
  };

  return (
    <Card>
      <InputField
        placeholder="Candidate name, skills"
        onChange={changeInputHandler}
        value={searchInput}
      />
      <Button text="Reset" onClick={resetHandler} />
      <Button text="Add Candidate" icon="add" onClick={addNewCandidate} />
    </Card>
  );
};

export default MainMenu;
