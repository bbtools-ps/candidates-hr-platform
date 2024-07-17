import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Tag } from "../models";

export const useTagsInput = (initialTags: Tag[] | undefined) => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Tag[]>(initialTags || []);
  const [isTouched, setIsTouched] = useState(false);
  const hasError = isTouched && !tags.length && !value;

  const addTags = useCallback((value: string) => {
    setTags((prevState) => {
      if (prevState.find((item) => item.value === value)) {
        return prevState;
      } else {
        return [...prevState, { id: uuid(), value }];
      }
    });
    setValue("");
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(",")) {
      addTags(value.slice(0, -1));
    } else {
      setValue(value);
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value) {
      addTags(value);
    } else {
      setValue("");
    }

    setIsTouched(true);
  };

  const removeTags = (id: string) => {
    setTags((prevState) => prevState.filter((item) => item.id !== id));
  };

  return {
    value,
    tags,
    onChange,
    onBlur,
    removeTags,
    hasError,
  };
};
