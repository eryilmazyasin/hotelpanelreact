import axios from "axios";

import { ICustomer } from "../interfaces/interface.ts";

export const postAddCustomer = async (params: ICustomer) => {
  const response = await axios.post("/api/customers", params);
  return response.data;
};
