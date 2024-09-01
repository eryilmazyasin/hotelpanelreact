import axios from "axios";

interface ILoginUser {
  name: string;
  password: string;
}

export const postLoginUser = async (params: ILoginUser) => {
  console.log({ params });
  const response = await axios.post("/auth/login", params);
  console.log({ response });
  return response.data;
};
