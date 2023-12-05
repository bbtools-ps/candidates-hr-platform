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

const TagsInput: React.FC<ITagsInputProps> = ({
  id,
  label,
  tags,
  placeholder = "Press comma to add tags",
  onRemoveTags,
  error,
  ...rest
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <div
        className={`border-gray mt-2 flex max-h-20 flex-wrap items-center overflow-auto rounded border-2 border-solid p-2 duration-100 hover:outline-blue ${
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
              className="text-white group flex items-center justify-center rounded bg-blue px-2 py-1 text-base font-bold"
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
          {...rest}
          className={`bg-transparent flex-1 p-2 focus:outline-none ${
            error ? "placeholder:text-black" : ""
          }`}
        />
      </div>
      {error && (
        <p className="text-red" data-cy="invalid-phone">
          {error}
        </p>
      )}
    </div>
  );
};

export default TagsInput;
