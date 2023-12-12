import { Tag } from "@/common/models";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

interface ITagsInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label: string;
  tags: Tag[];
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (payload: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (payload: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveTags: (id: string) => void;
}

export default function TagsInput({
  id,
  label,
  tags,
  placeholder = "Press comma to add tags",
  onRemoveTags,
  error,
  ...rest
}: ITagsInputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <div
        className={`mt-2 flex max-h-20 flex-wrap items-center overflow-auto rounded border-2 border-solid border-gray p-2 duration-100 focus-within:outline focus-within:outline-2 focus-within:outline-black hover:border-blue dark:border-slate-600 dark:focus-within:border-black dark:focus-within:outline-white dark:hover:border-blue ${
          error ? "bg-rose-300" : ""
        }`}
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
          {tags.map(({ id, value }) => (
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
                onClick={() => onRemoveTags(id)}
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
          className={`flex-1 bg-transparent p-2 focus:outline-none ${
            error ? "placeholder:text-black" : ""
          }`}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-red dark:text-rose-400" data-cy={`invalid-${id}`}>
          {error}
        </p>
      )}
    </div>
  );
}
