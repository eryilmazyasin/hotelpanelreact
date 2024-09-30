import axios from "axios";

import { IRoom } from "../interfaces/interface.ts";

export const updateRoom = async (params: IRoom) => {
  const response = await axios.put(`/api/rooms/${params.id}`, params);
  return response.data;
};
