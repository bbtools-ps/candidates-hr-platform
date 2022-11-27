import { useState } from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import InputField from "./UI/InputField";

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
    <Card>
      <InputField
        placeholder="Candidate name, skills"
        onChange={changeInputHandler}
        value={searchInput}
        id="search-candidates"
      />
      <Button text="Reset" onClick={resetHandler} />
      <Button text="Add Candidate" icon="add" onClick={addNewCandidate} />
    </Card>
  );
};

export default MainMenu;
