import Footer from "@/common/components/Footer/Footer";
import MainMenu from "@/common/components/MainMenu/MainMenu";
import { useCandidatesStore } from "@/store/candidates";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { searchTerm, searchCandidate } = useCandidatesStore();

  const navigate = useNavigate();
  return (
    <>
      <MainMenu
        searchInput={searchTerm}
        onChange={(e) => {
          searchCandidate(e.target.value);
        }}
        onAddNewCandidate={() => {
          navigate("/new-candidate");
        }}
      />
      <Outlet />
      <Footer copyrightLabel="Bogdan Bogdanovic" />
    </>
  );
};

export default RootLayout;
