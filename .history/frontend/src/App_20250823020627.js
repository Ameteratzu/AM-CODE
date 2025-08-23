import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        {/*Ruta Raiz*/}
        <Route
        path="/"
        element={
         <Home />}
        >

        </Route>

        <Route>


        </Route>
      </Routes>
    </>
  );
}

export default App;
