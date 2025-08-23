// frontend/src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import Capture from "./pages/Capture";
import Admin from "./pages/Admin";
import { getToken, getUser } from "./services/auth";

function RequireAuth({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}
function RequireRole({ children, roles }) {
  const me = getUser();
  return (me && roles.includes(me.rol)) ? children : <Navigate to="/" replace />;
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
