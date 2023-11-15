import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Card from "@/common/components/Card/Card";
import Protected from "@/common/components/Protected";
import classes from "@/common/styles/CandidateWrapper.module.css";
import { useCandidatesStore } from "@/store/candidates";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NewCandidate = () => {
  const { allCandidates, addCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <Protected condition={!!allCandidates.length}>
      <div className={classes["candidate-wrapper"]}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classes["backdrop"]}
          onClick={() => {
            navigate("..");
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          style={{ zIndex: 3 }}
        >
          <div className={classes.card}>
            <Card>
              <h2 data-cy="heading">New candidate</h2>
              <CandidateForm
                onCancel={() => {
                  navigate("..");
                }}
                onSubmit={(candidate) => {
                  addCandidate(candidate);
                  navigate("..");
                }}
              />
            </Card>
          </div>
        </motion.div>
      </div>
    </Protected>
  );
};

export default NewCandidate;
