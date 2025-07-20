import { useNavigate } from "react-router-dom";

export const Sidebar = ({
  onSelectSection,
}: {
  onSelectSection: (section: string) => void;
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Manage Users", path: "/manage-users" },
    { name: "Manage Products", path: "/manage-products" },
    { name: "Manage Orders", path: "/manage-orders" },
  ];

  const handleNavigation = (item: { name: string; path: string }) => {
    onSelectSection(item.name);
    navigate(`/dashboard/admin${item.path}`);
  };

  return (
    <aside className="lg:w-72 w-full bg-gray-900 text-white flex lg:flex-col flex-row items-start justify-start lg:min-h-screen lg:border-r border-b border-gray-700 shadow-lg">
      {/* Header */}
      <div className="hidden lg:block text-2xl font-bold p-6 text-center border-b border-gray-700 bg-gray-800 lg:w-full">
        Admin Panel
      </div>

      {/* Menu Items */}
      <ul className="flex lg:flex-col flex-row lg:space-y-4 lg:p-4 p-2 items-center">
        {menuItems.map((item, index) => (
          <li key={index} className="group w-full">
            <div
              className="cursor-pointer p-4 rounded-md hover:bg-purple-500 flex items-center justify-between transition-colors duration-200"
              onClick={() => handleNavigation(item)}
            >
              <span className="group-hover:text-gray-100">{item.name}</span>
            </div>
            {/* Divider */}
            {index < menuItems.length - 1 && <hr className="border-none lg:border-gray-700" />}
          </li>
        ))}
      </ul>
    </aside>
  );
};
