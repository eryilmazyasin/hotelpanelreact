import axios from "axios";

export const getCustomers = async (searchTerm = "", page = 1) => {
  const response = await axios.get("/api/customers/with-reservations", {
    params: { search: searchTerm, page, limit: 50 }, // 50 müşterilik sayfa
  });
  return response.data;
};
