import { Outlet } from "react-router-dom";
import { UserSidebar } from "./UserSidebar";
import { useState } from "react";


const UserDashboard = () => {
    const [selectedSection, setSelectedSection] = useState<string>("");

    console.log("Selected Section", selectedSection);
  return (
    <div className="flex flex-col lg:flex-row">
      <UserSidebar onSelectSection={setSelectedSection} />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
