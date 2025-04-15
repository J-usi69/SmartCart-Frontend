import { Route, Routes, Navigate } from "react-router-dom";
import { NavBar } from "./Components/NavBar.jsx";
import { Login } from "./Routes/Login/Login.jsx";
import { Registrar } from "./Routes/Registros/Registrar.jsx";
import { Home } from "./Routes/Home/Home.jsx";
import { Cliente } from "./Routes/Client/Cliente.jsx";
import { Delivery } from "./Routes/Delivery/Delivery.jsx";
import { Administrador } from "./Routes/Admin/Administrador.jsx";
import { Table_Users } from "./Routes/Admin/Gestion-Usuario/Table_Users.jsx";
import { Table_Products } from "./Routes/Admin/Gestion-Productos/Table_Products.jsx";
import { Table_Delivery } from "./Routes/Admin/Gestion-Delivery/Table_Delivery.jsx";
import { isAuthenticated } from "./Api/AuthService.js";
import { Settings } from "./Routes/Settings/Settings.jsx"
import { Reportes } from "./Routes/Admin/Reports/Reportes.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Redirección automática a /Home si está logueado, o /Login si no */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/Home" replace /> : <Navigate to="/Login" replace />
          }
        />

        {/* Rutas públicas */}
        <Route
          path="/Login"
          element={isAuthenticated() ? <Navigate to="/Home" /> : <Login />}
        />
        <Route path="/Registers" element={<Registrar />} />  


        {/* Rutas accesibles solo después del login */}
        {isAuthenticated() && (
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/Client" element={<Cliente />} />
            <Route path="/Delivery" element={<Delivery />} />
            <Route path="/Admin" element={<Administrador />}>
              <Route path="Users" element={<Table_Users />} />
              <Route path="Productos" element={<Table_Products />} />
              <Route path="Pedidos" element={<Table_Delivery />} />'
              <Route path="Settings" element={<Settings/>}/>
              <Route path="Reports" element={<Reportes/>}/>
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
