// hooks/useAuth.js
import { useContext } from "react";

import { AuthContext } from "../context/authContext.tsx";

export const useAuth = () => {
  return useContext(AuthContext);
};
