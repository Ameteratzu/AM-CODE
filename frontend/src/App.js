// frontend/src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import Capture from "./pages/Capture";
import Admin from "./pages/Admin";
import { getToken, getUser } from "./services/auth";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Portafolio from "./pages/Portafolio";
import About from "./pages/About";
import SharedLayout from "./components/SharedLayout";
import SharedFooter from "./components/SharedFooter";
import Prices from "./pages/Price";
import Politicas from "./pages/Politicas";

function RequireAuth({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}
function RequireRole({ children, roles }) {
  const me = getUser();
  return (me && roles.includes(me.rol)) ? children : <Navigate to="/" replace />;

function App() {
  return (
    <>
      <Routes>
        {/*Ruta Raiz*/}
        <Route path="/" element={<Home />}></Route>

        {/* Rutas que comparten Footer */}
        <Route element={<SharedFooter />}>
          <Route path="/about" element={<About />} />
        </Route>

        {/* Rutas que comparten Navbar y Footer */}
        <Route element={<SharedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portafolio />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/politicas" element={<Politicas />} />
        </Route>

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/asistencia" element={<RequireAuth><Attendance /></RequireAuth>} />
      <Route path="/capturas" element={<RequireAuth><Capture /></RequireAuth>} />
      <Route path="/admin" element={
        <RequireAuth>
          <RequireRole roles={['ADMIN','MANAGER']}>
            <Admin />
          </RequireRole>
        </RequireAuth>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
