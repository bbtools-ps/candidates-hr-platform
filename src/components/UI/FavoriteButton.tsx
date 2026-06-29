import { cn } from "@/utils/cn";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FavoriteButtonProps {
  isFavorite?: boolean;
  className?: string;
  label?: string;
  onClick: () => void;
}

export default function FavoriteButton({
  isFavorite = false,
  className,
  label = "Add to favorite",
  onClick,
}: FavoriteButtonProps) {
  return (
    <button
      className={cn(
        "text-blue hover:text-blue/80 flex h-9 w-9 items-center justify-center p-2 duration-100 dark:text-sky-400 dark:hover:text-sky-400/80",
        className
      )}
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faStar : faStarOutline}
        className="h-full w-full"
      />
    </button>
  );
}
