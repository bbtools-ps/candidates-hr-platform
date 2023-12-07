import Footer from "@/common/components/Footer/Footer";
import MainMenu from "@/common/components/MainMenu/MainMenu";
import { useCandidatesStore } from "@/store/candidates";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { searchTerm, searchCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <>
      <header className="z-10 shadow-md">
        <MainMenu
          searchInput={searchTerm}
          onChange={(e) => {
            searchCandidate(e.target.value);
          }}
          onAddNewCandidate={() => {
            navigate("/new-candidate");
          }}
        />
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <footer className="flex justify-center py-4 text-white">
        <Footer copyrightLabel="Bogdan Bogdanovic" />
      </footer>
    </>
  );
};

export default RootLayout;
