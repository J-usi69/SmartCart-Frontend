import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar.jsx";

export const Administrador = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};
