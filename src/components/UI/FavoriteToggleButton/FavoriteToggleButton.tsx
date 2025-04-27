import { cn } from "@/utils/cn";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FavoriteToggleButtonProps {
  isFavorite?: boolean;
  className?: string;
  label?: string;
  onToggleFavorite: () => void;
}

export default function FavoriteToggleButton({
  isFavorite = false,
  className,
  label = "Add to favorite",
  onToggleFavorite,
}: FavoriteToggleButtonProps) {
  return (
    <button
      className={cn(
        "flex h-9 w-9 items-center justify-center p-2 text-blue duration-100 hover:text-blue/80 dark:text-sky-400 dark:hover:text-sky-400/80",
        className
      )}
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={onToggleFavorite}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faStar : faStarOutline}
        className="h-full w-full"
      />
    </button>
  );
}
