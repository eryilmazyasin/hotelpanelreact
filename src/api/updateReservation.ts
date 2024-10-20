import axios from "axios";

import { IReservation } from "../interfaces/interface.ts";

export const updateReservation = async (params: IReservation) => {
  const response = await axios.put(`/api/reservations/${params.id}`, params);
  return response.data;
};
