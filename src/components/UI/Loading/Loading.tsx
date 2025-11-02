import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();

  return <p>{t("Loading_Label")}</p>;
}
