import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import classes from "./TagsInput.module.css";

type Tag = {
  id: string;
  value: string;
};

interface ITagsInputProps {
  id: string;
  label: string;
  initialTags?: Tag[];
  placeholder?: string;
}

const TagsInput: React.FC<ITagsInputProps> = ({
  id,
  label,
  initialTags = [],
  placeholder = "Press comma to add tags",
}) => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(",", "");
    setValue(value);
  };

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," && e.currentTarget.value !== "") {
      setTags([...tags, { id: uuid(), value: e.currentTarget.value }]);
      setValue("");
    }
  };

  const removeTags = (id: string) => {
    setTags((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div className={classes["outer-container"]}>
      <label htmlFor={id}>{label}</label>
      <div className={classes["inner-container"]}>
        <ul className={classes.tags}>
          {tags.map(({ id, value }) => (
            <li key={id} className={classes.tag}>
              <span>{value}</span>
              <button type="button">
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={() => removeTags(id)}
                />
              </button>
            </li>
          ))}
        </ul>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyUp={(event) => addTags(event)}
        />
      </div>
    </div>
  );
};

export default TagsInput;
