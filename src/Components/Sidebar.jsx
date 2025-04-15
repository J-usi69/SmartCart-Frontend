// Componente/Sidebar.jsx
import { Home, Users, FileText, Package, Settings, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#0F172A] text-white flex flex-col justify-between">
      <div>
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
            <span className="font-bold text-lg">SMART POS</span>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          <Link
            to="/Admin"
            className="flex items-center space-x-3 px-4 py-2 rounded-md bg-[#1E293B] font-semibold"
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/Admin/Users"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1E293B] rounded-md"
          >
            <Users size={18} />
            <span>Gestionar Usuarios</span>
          </Link>

          <Link
            to="/Admin/Pedidos"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1E293B] rounded-md"
          >
            <Package size={18} />
            <span>Gestionar Pedidos</span>
          </Link>

          <Link
            to="/Admin/Productos"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1E293B] rounded-md"
          >
            <ShoppingBag size={18} />
            <span>Gestionar Productos</span>
          </Link>

          <Link
            to="/Admin/Reports"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1E293B] rounded-md"
          >
            <FileText size={18} />
            <span>Reportes</span>
          </Link>
        </nav>
      </div>

      <div className="p-4">
        <Link
          to="/Admin/Settings"
          className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1E293B] rounded-md"
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
