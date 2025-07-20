import { useNavigate } from "react-router-dom";

export const UserSidebar = ({
  onSelectSection,
}: {
  onSelectSection: (section: string) => void;
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Profile Settings", path: "/profile" },
    { name: "View Orders", path: "/orders" },
    { name: "Browse Products", path: "/all-products" },
  ];

  const handleNavigation = (item: { name: string; path: string }) => {
    onSelectSection(item.name);
    if(item.name == "Browse Products") navigate(`${item.path}`);
    else navigate(`/dashboard/user${item.path}`);
  };

  return (
    <aside className="lg:w-72 w-full bg-gray-900 text-white flex lg:flex-col flex-row items-center lg:items-start justify-start lg:min-h-screen lg:border-r border-b border-gray-700 shadow-lg">
      {/* Header */}
      <div className="hidden lg:block text-2xl font-bold p-6 text-center border-b border-gray-700 bg-gray-800 lg:w-full">
        User Panel
      </div>

      {/* Menu Items */}
      <ul className="flex lg:flex-col flex-row lg:space-y-4  lg:p-4 p-2 flex-grow items-center">
        {menuItems.map((item, index) => (
          <li key={index} className="group w-full">
            <div
              className="cursor-pointer p-4 rounded-md hover:bg-purple-500 flex items-center justify-between transition-colors duration-200"
              onClick={() => handleNavigation(item)}
            >
              <span className="group-hover:text-gray-100">{item.name}</span>
            </div>
            {/* Divider */}
            {index < menuItems.length - 1 && (
              <hr className="border-none lg:border-gray-700 w-full" />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
