import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Tag } from "../models";

export const useTagsInput = (initialTags: Tag[] | undefined) => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Tag[]>(initialTags || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const addTags = (inputValue: string) => {
    const value = inputValue.trim().replace(",", "");

    if (!value) return;

    setTags((prevState) => [...prevState, { id: uuid(), value }]);
    setValue("");
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ",") {
      addTags(e.currentTarget.value);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTags(e.target.value);
  };

  const removeTags = (id: string) => {
    setTags((prevState) => prevState.filter((item) => item.id !== id));
  };

  return { value, tags, handleChange, handleKeyUp, removeTags, handleBlur };
};
