import { Link } from "react-router-dom";

export const NavBar = ({ onLoginClick }) => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            <Link to="/Admin" className="text-white px-3 py-2">ADMIN</Link>
            <Link to="/Client" className="text-white px-3 py-2">CLIENTE</Link>
            <Link to="/Delivery" className="text-white px-3 py-2">DELIVERY</Link>
            <Link to="/Home" className="text-white px-3 py-2">HOME</Link>
            <Link to="/Products" className="text-white px-3 py-2">PRODUCTOS</Link>
          </div>
          <div>
            <button
              onClick={onLoginClick}
              className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition text-sm"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
