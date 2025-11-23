import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CandidatesLogoIcon from "../Icons/CandidatesLogoIcon";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } }}
    >
      <Link
        to="/"
        className="group flex"
        data-cy="candidates-logo"
        onClick={onClick}
      >
        <CandidatesLogoIcon className="group-hover:fill-blue mr-2 w-12.5 duration-100 dark:fill-white dark:group-hover:fill-sky-400" />
        <div className="group-hover:text-blue flex-col duration-100 md:flex dark:text-white dark:group-hover:text-sky-400">
          <h1 className="relative w-0 overflow-hidden text-3xl font-bold uppercase lg:w-auto">
            {t("Candidates_Label")}
          </h1>
          <p className="hidden text-base lg:block">
            {t("HRAssistancePlatform_Label")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
