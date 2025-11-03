import { Outlet } from "react-router";
import CandidatesList from "../components/CandidatesList/CandidatesList";

export default function HomePage() {
  return (
    <>
      <CandidatesList />
      <Outlet />
    </>
  );
}
