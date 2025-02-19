import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.tsx";
import HomePage from "./pages/Admin/HomePage.tsx";
import Customers from "./pages/Admin/Customers.tsx";
import UnauthPage from "./pages/Unauth/UnauthPage.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import Login from "./pages/Auth/Login.tsx";
import Logout from "./pages/Auth/Logout.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<AdminLayout />}>
              {/* Varsayılan sayfa olarak HomePage */}
              <Route index element={<HomePage />} />
              <Route path="customers" element={<Customers />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>

          {/* Yanlış bir rotaya giderse yönlendirme */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </Router>
  );
};

export default App;
