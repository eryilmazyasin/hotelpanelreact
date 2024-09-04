import axios from "axios";

export const getCustomers = async () => {
  const response = await axios.post("/api/customers");
  return response.data;
};
