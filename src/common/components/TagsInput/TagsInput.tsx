import { Tag } from "@/common/models";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import classes from "./TagsInput.module.css";

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
  onChange: (payload: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (payload: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveTags: (id: string) => void;
}

const TagsInput: React.FC<ITagsInputProps> = ({
  id,
  label,
  tags,
  placeholder = "Press comma to add tags",
  value,
  onChange,
  onKeyUp,
  onBlur,
  onRemoveTags,
  className,
  ...rest
}) => {
  return (
    <div className={classes["outer-container"]}>
      <label htmlFor={id}>{label}</label>
      <div className={`${classes["inner-container"]} ${className}`}>
        <motion.ul
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            show: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className={classes.tags}
        >
          {tags.map(({ id, value }) => (
            <motion.li
              key={id}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                show: { opacity: 1, scale: 1 },
              }}
              className={classes.tag}
            >
              <span>{value}</span>
              <button type="button" onClick={() => onRemoveTags(id)}>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </motion.li>
          ))}
        </motion.ul>
        <input
          {...rest}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          className={className}
        />
      </div>
    </div>
  );
};

export default TagsInput;
