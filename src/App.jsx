import { Administrador } from "./Routes/Admin/Administrador.jsx";
import { Cliente } from "./Routes/Client/Cliente.jsx";
import { Delivery } from "./Routes/Delivery/Delivery.jsx";
import { Login } from "./Routes/Login/Login.jsx";
import { Home } from "./Routes/Home/Home.jsx";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/NavBar.jsx";
import { Registrar } from "./Routes/Registros/Registrar.jsx";

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Admin" element={<Administrador />}></Route>
          <Route path="/Client" element={<Cliente />}></Route>
          <Route path="/Delivery" element={<Delivery />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Registers" element={<Registrar/>}></Route>
      </Routes>
    </>
  );
}

export default App;
