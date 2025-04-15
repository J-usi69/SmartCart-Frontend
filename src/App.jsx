import { Route, Routes, Navigate} from "react-router-dom";
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
import { useState } from "react";

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      <NavBar onLoginClick={() => setMostrarLogin(true)} />
      {mostrarLogin && <Login onClose={() => setMostrarLogin(false)} />}

      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Registers" element={<Registrar />} />
        <Route path="/Client" element={<Cliente />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/Admin" element={<Administrador />}>
          <Route path="Users" element={<Table_Users />} />
          <Route path="Productos" element={<Table_Products />} />
          <Route path="Pedidos" element={<Table_Delivery />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
