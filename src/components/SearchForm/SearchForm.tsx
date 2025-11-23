import { useDebounce } from "@/hooks";
import { cn } from "@/utils/cn";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const DEBOUNCE_TIMEOUT = 500;

interface SearchFormProps {
  label?: string;
  placeholder?: string;
  debounceTimeout?: number;
  defaultValue: string;
  clearButtonLabel?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function SearchForm({
  label,
  placeholder,
  debounceTimeout = DEBOUNCE_TIMEOUT,
  defaultValue,
  clearButtonLabel,
  onChange,
  className,
}: SearchFormProps) {
  const { t } = useTranslation();
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
    <div className={cn("relative w-full flex-1 lg:w-auto", className)}>
      <span className="text-gray absolute left-4 flex h-full items-center">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <form
        role="search"
        aria-label={label}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="group relative w-full duration-200 focus-within:w-full xl:w-1/2">
          <input
            ref={inputRef}
            aria-label={label}
            data-cy="search-candidates"
            className="border-gray hover:border-blue w-full truncate rounded-full border-2 border-solid bg-transparent py-2 pr-4 pl-10 text-lg dark:border-slate-600 dark:text-white dark:hover:border-sky-400"
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />
          {value.length > 0 && (
            <button
              type="button"
              className="bg-blue absolute top-0 right-4 h-6 w-6 translate-y-[50%] rounded-full text-white"
              onClick={handleClear}
              aria-label={
                clearButtonLabel ?? t("ClearSearchInputFallback_Label")
              }
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
