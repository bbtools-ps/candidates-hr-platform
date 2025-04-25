import type { Tag } from "@/models";
import { convertToKebabCase } from "@/utils";
import { cn } from "@/utils/cn";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

interface TagsInputProps {
  id?: string;
  placeholder?: string;
  label?: string;
  tags: Tag[] | undefined;
  hasError?: boolean;
  isRequired?: boolean;
  onAdd: (value: Tag) => void;
  onRemove: (index: number) => void;
}

export default function TagsInput({
  label,
  id: idProp,
  tags,
  placeholder = "Press comma to add tags",
  hasError,
  isRequired,
  onAdd,
  onRemove,
}: TagsInputProps) {
  const id = idProp || convertToKebabCase(label);

  const [value, setValue] = useState("");

  const addTag = useCallback(
    (value: string) => {
      setValue("");
      onAdd({ id: uuid(), value });
    },
    [onAdd]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(",")) {
      addTag(value.slice(0, -1));
    } else {
      setValue(value);
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value) {
      addTag(value);
    } else {
      setValue("");
    }
  };

  const removeTag = (id: string) => {
    onRemove(tags?.findIndex((item) => item.id === id) || -1);
  };

  return (
    <>
      {label && (
        <label htmlFor={id}>
          {label}
          {isRequired && (
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          )}
        </label>
      )}
      <div
        className={cn(
          "flex max-h-20 flex-wrap items-center overflow-auto rounded border-2 border-solid border-gray p-2 duration-100 focus-within:outline focus-within:outline-2 focus-within:outline-black hover:border-blue dark:border-slate-600 dark:focus-within:border-black dark:focus-within:outline-white dark:hover:border-sky-400",
          hasError && "bg-rose-300"
        )}
      >
        <motion.ul
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="flex list-none flex-wrap gap-2"
        >
          {tags?.map(({ id, value }) => (
            <motion.li
              key={id}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                show: { opacity: 1, scale: 1 },
              }}
              className="group flex items-center justify-center rounded bg-blue px-2 py-1 text-base font-bold text-white"
            >
              <span>{value}</span>
              <button
                type="button"
                onClick={removeTag.bind(null, id)}
                className="px-2"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </motion.li>
          ))}
        </motion.ul>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent p-2 focus:outline-none",
            hasError && "placeholder:text-black"
          )}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          data-testid="tags-input"
        />
        <input
          className="hidden"
          value={
            tags
              ?.reduce((acc, curr) => acc + curr.value + ",", "")
              .slice(0, -1) || value
          }
          readOnly
        />
      </div>
    </>
  );
}
