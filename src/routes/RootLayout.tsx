import Footer from "@/components/UI/Footer/Footer";
import MainMenu from "@/components/UI/MainMenu/MainMenu";
import { useCandidatesStore } from "@/store/candidates";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
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
}
