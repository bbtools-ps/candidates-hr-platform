import { DUMMY_CANDIDATES } from "@/data/data";
import { useCandidatesStore } from "@/store/candidates";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import VirtualList from "../VirtualList/VirtualList";
import CandidateItem from "./CandidateItem";

export default function CandidatesList() {
  const {
    filterCandidates,
    filteredCandidates,
    removeCandidate,
    setCandidates,
    toggleFavorite,
  } = useCandidatesStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCandidates(DUMMY_CANDIDATES);
    setIsLoading(false);
  }, [setCandidates]);

  const [searchParams] = useSearchParams();
  const isFavorite = searchParams.get("isFavorite") === "true";
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    filterCandidates(searchTerm, isFavorite);
  }, [filterCandidates, isFavorite, searchTerm]);

  const { t } = useTranslation();

  return (
    <section className="flex flex-1 flex-col">
      {isLoading && <p>{t("Loading_Label")}</p>}
      {filteredCandidates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 items-center justify-center text-2xl text-white"
          data-cy="no-results-placeholder"
        >
          {t("NoCandidatesFound_Label")}
        </motion.div>
      )}
      {filteredCandidates.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <VirtualList items={filteredCandidates} className="h-full">
            {(item) => (
              <div className="flex w-full justify-center">
                <CandidateItem
                  candidate={item}
                  onRemoveCandidate={removeCandidate}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            )}
          </VirtualList>
        </motion.div>
      )}
    </section>
  );
}
