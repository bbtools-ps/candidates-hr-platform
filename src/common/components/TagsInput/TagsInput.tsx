import { Tag } from "@/common/models";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  onKeyUp: (payload: React.KeyboardEvent<HTMLInputElement>) => void;
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
  ...rest
}) => {
  return (
    <div className={classes["outer-container"]}>
      <label htmlFor={id}>{label}</label>
      <div className={classes["inner-container"]}>
        <ul className={classes.tags}>
          {tags.map(({ id, value }) => (
            <li key={id} className={classes.tag}>
              <span>{value}</span>
              <button type="button" onClick={() => onRemoveTags(id)}>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </li>
          ))}
        </ul>
        <input
          {...rest}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default TagsInput;
