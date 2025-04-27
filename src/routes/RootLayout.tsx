import Footer from "@/components/UI/Footer/Footer";
import MainMenu from "@/components/UI/MainMenu/MainMenu";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <header className="z-10 shadow-md">
        <MainMenu />
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
