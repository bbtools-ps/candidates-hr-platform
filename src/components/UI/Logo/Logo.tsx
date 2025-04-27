import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import CandidatesLogoIcon from "../Icons/CandidatesLogoIcon";

export default function Logo() {
  const { t } = useTranslation();

  return (
    <motion.a
      variants={{ hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } }}
      href="./"
      className="group flex"
      data-cy="candidates-logo"
    >
      <CandidatesLogoIcon className="mr-2 w-[3.125rem] duration-100 group-hover:fill-blue dark:fill-white dark:group-hover:fill-sky-400" />
      <div className="hidden flex-col duration-100 group-hover:text-blue dark:text-white dark:group-hover:text-sky-400 md:flex">
        <h1 className="hidden text-3xl font-bold uppercase lg:block">
          {t("Candidates_Label")}
        </h1>
        <p className="hidden text-base lg:block">
          {t("HRAssistancePlatform_Label")}
        </p>
      </div>
    </motion.a>
  );
}
