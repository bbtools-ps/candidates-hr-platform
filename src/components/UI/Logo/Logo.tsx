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
        <CandidatesLogoIcon className="mr-2 w-[3.125rem] duration-100 group-hover:fill-blue dark:fill-white dark:group-hover:fill-sky-400" />
        <div className="hidden flex-col duration-100 group-hover:text-blue dark:text-white dark:group-hover:text-sky-400 md:flex">
          <h1 className="-z-10 text-3xl font-bold uppercase lg:z-0 lg:block">
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
