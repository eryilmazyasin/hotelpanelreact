import axios from "axios";

export interface IRoom {
  room_number: string;
  room_type: string;
  description: string;
  price_per_night: number;
  is_available: number;
}

export const postAddRoom = async (params: IRoom) => {
  const response = await axios.post("/api/rooms", params);
  return response.data;
};
