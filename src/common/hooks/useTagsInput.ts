import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Tag } from "../models";

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

  useEffect(() => {
    const transformedValue = value.replace(",", "");

    if (transformedValue.trim().length && value.at(-1) === ",") {
      addTags(transformedValue);
    } else {
      setValue(transformedValue);
    }
  }, [addTags, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value) {
      addTags(value);
    }

    setValue(value);
    setIsTouched(true);
  };

  const removeTags = (id: string) => {
    setTags((prevState) => prevState.filter((item) => item.id !== id));
  };

  return {
    value,
    tags,
    handleChange,
    removeTags,
    handleBlur,
    hasError,
  };
};
