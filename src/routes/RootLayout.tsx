import Footer from "@/components/UI/Footer/Footer";
import MainMenu from "@/components/UI/MainMenu/MainMenu";
import { useCandidatesStore } from "@/store/candidates";
import { Outlet, useSearchParams } from "react-router";

export default function RootLayout() {
  const { searchTerm, searchCandidate } = useCandidatesStore();

  const [searchParams] = useSearchParams();
  const isFavorite = searchParams.get("isFavorite") === "true";

  return (
    <>
      <header className="z-10 shadow-md">
        <MainMenu
          searchInput={searchTerm}
          onChange={(e) => {
            searchCandidate(e.target.value, isFavorite);
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
