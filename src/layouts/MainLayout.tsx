import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Toaster } from "react-hot-toast";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
            padding: "14px",
            fontSize: "16px",
          },
          success: {
            style: {
              background: "#7e22ce", // Purple background
              color: "#fff",
              border: "1px solid #5b21b6", // Darker purple border
            },
            iconTheme: {
              primary: "#5b21b6",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              background: "#f87171", // Red background
              color: "#fff",
              border: "1px solid #dc2626", // Darker red border
            },
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fff",
            },
          },
        }}
      />
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
