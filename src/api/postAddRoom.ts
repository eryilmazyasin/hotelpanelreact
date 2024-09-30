import axios from "axios";

import { IRoom } from "../interfaces/interface.ts";

export const postAddRoom = async (params: IRoom) => {
  const response = await axios.post("/api/rooms", params);
  return response.data;
};
