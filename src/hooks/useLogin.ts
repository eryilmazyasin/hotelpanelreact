import { useNavigate } from "react-router-dom";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postLoginUser } from "../api/postLoginUser.ts";
import { useAuth } from "./useAuth.ts";

interface IParams {
  name: string;
  password: string;
}

export interface ILoginUser {
  token: string;
}

const useLogin = (): UseMutationResult<ILoginUser, AxiosError, IParams> => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params) => {
      return postLoginUser(params);
    },
    onSuccess: (data) => {
      login(data.token);
      navigate("/home");
      return data.payload;
    },
  });
};
export default useLogin;
