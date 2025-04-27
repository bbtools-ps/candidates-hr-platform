import { useDebounce } from "@/hooks";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const DEBOUNCE_TIMEOUT = 500;

interface SearchFormProps {
  label?: string;
  placeholder?: string;
  debounceTimeout?: number;
  defaultValue: string;
  onChange: (value: string) => void;
}

export default function SearchForm({
  label,
  placeholder,
  debounceTimeout = DEBOUNCE_TIMEOUT,
  defaultValue,
  onChange,
}: SearchFormProps) {
  const debounce = useDebounce(debounceTimeout);

  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    debounce(() => {
      onChange(newValue.trim());
    });
  };

  const handleClear = () => {
    setValue("");
    onChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form role="search" aria-label={label} onSubmit={(e) => e.preventDefault()}>
      <div className="group relative w-full duration-200 focus-within:w-full xl:w-1/2">
        <input
          ref={inputRef}
          aria-label={label}
          className="w-full truncate rounded-full border-2 border-solid border-gray bg-transparent py-2 pl-10 pr-4 text-lg hover:border-blue dark:border-slate-600 dark:text-white dark:hover:border-sky-400"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
        {value.length > 0 && (
          <button
            type="button"
            className="absolute right-4 top-0 h-6 w-6 translate-y-[50%] rounded-full bg-blue text-black dark:text-white"
            onClick={handleClear}
            aria-label="Clear search input"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
    </form>
  );
}
