import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const SharedFooter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow relative w-full">
        <Outlet />
      </main>
      <Footer className="w-full h-[240px] bg-black" />
    </div>
  );
};


export default SharedFooter;
