// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.tsx";
import HomePage from "./pages/Admin/HomePage.tsx";
import Settings from "./pages/Admin/Settings.tsx";
import Profile from "./pages/Admin/Profile.tsx";
import UnauthPage from "./pages/Unauth/UnauthPage.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import Login from "./pages/Auth/login.tsx";
import { AuthProvider } from "./context/authContext.tsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="home" />} />{" "}
              {/* Anasayfa yönlendirmesi */}
              <Route path="home" element={<HomePage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Eğer kullanıcı yanlış bir rotaya giderse yönlendirme */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
