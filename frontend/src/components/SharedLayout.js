// src/layouts/SharedLayout.jsx
import { Outlet } from "react-router-dom";
import NavbarLayout from "../components/NavbarRecicler";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
export default function SharedLayout() {
  return (
    <>
      <main className="relative w-full min-h-[950px]">
        <NavbarLayout />
        <Outlet /> {/* Aquí se renderiza la página específica */}
      </main>
      <Footer className="w-full h-[280px] bg-black" />
    </>
  );
}
