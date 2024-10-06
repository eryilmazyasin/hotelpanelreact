import axios from "axios";

import { IReservation } from "../interfaces/interface.ts";

export const postAddReservation = async (params: IReservation) => {
  const response = await axios.post("/api/reservations", params);
  return response.data;
};
