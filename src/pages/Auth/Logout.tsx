import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useAuth } from "../../hooks/useAuth.ts";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return <div>Çıkış yapılıyor...</div>;
};

export default Logout;
