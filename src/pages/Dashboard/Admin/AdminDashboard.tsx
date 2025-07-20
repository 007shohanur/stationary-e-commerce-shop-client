import React from "react";
import { Sidebar } from "./AdminSidebar";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const [selectedSection, setSelectedSection] = React.useState(() => {
    switch (currentPath) {
      case "manage-users":
        return "Manage Users";
      case "manage-products":
        return "Manage Products";
      case "manage-orders":
        return "Manage Orders";
      default:
        return "Dashboard";
    }
  });

  console.log("Select", selectedSection);

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Sidebar */}
      <Sidebar onSelectSection={setSelectedSection} />
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
