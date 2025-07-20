import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import { About } from "../pages/About";
import AllProducts from "../pages/AllProducts";
import { ProductDetails } from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import { Login } from "../pages/Login";
import useAuth from "../hooks/useAuth";
import { UserTable } from "@/pages/Dashboard/Admin/AdminUserTable";
import { ProductTable } from "@/pages/Dashboard/Admin/AdminProductTable";
import { OrderTable } from "@/pages/Dashboard/Admin/AdminOrderTable";
import { UserProfile } from "@/pages/Dashboard/User/UserProfile";
import UserDashboard from "@/pages/Dashboard/User/UserDashboard";
import { UserOrders } from "@/pages/Dashboard/User/UserOrders";
import { Contact } from "@/pages/Contact";
import AdminCharts from "@/pages/Dashboard/Admin/AdminCharts";
import { UserCharts } from "@/pages/Dashboard/User/UserCharts";


// Private Route Wrapper
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route Wrapper
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/login" />;
};

const appRoutes = createBrowserRouter([
  {
    element: (
      <MainLayout />
    ),
    children: [
      // Public Routes
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/all-products", element: <AllProducts /> },
      { path: "/product-details/:productId", element: <ProductDetails /> },
      { path: "/login", element: <Login /> },


      // Private Routes
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <UserCharts /> },
          { path: "orders", element: <UserOrders /> },
          { path: "profile", element: <UserProfile /> },
        ],
      },

      // Admin Routes
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          // Default route for "/dashboard/admin"
          { index: true, element: <AdminCharts /> },
          
          { path: "manage-users", element: <UserTable /> },
          { path: "manage-products", element: <ProductTable /> },
          { path: "manage-orders", element: <OrderTable /> },
        ],
      },      

      // Fallback Route
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

export default appRoutes;
