import { useState } from "react";
import { loginUser } from "../../Api/AuthService.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  /*Logica para recibir los datos desde el modal*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Login de los usuarios por Roles
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      console.log("Inicio Sesion Exitoso", data);
      console.log("Rol de Usuario: ", data.rol);
      
      switch (data.rol) {
        case "Administrador":
          navigate("/Admin");
          break;
        case "Cliente":
          navigate("/Client");
          break;
        case "Delivery":
          navigate("/Delivery");
          break;
        default:
          navigate("/Home");
      }
    } catch (err) {
      setError(err.mesage || "Error al iniciar Sesión");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          ¿No tienes cuenta?{" "}
          <Link
            to="/Registers"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1E293B] rounded-md"
          >
            <span>Registrar</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
