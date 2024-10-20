import axios from "axios";

import { ICustomers } from "../interfaces/interface.ts";

// postAddCustomer fonksiyonu artık müşteri dizisi alıyor
export const postAddCustomer = (customers: ICustomers[]) => {
  debugger;
  return axios.post("/api/customers", customers); // Toplu müşteri POST isteği
};
