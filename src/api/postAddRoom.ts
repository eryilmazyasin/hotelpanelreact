import axios from "axios";

export interface IAddRoom {
  room_number: string;
  room_type: string;
  description: string;
  price_per_night: number;
  is_available: number;
}

export const postAddRoom = async (params: IAddRoom) => {
  const response = await axios.post("/api/rooms", params);
  console.log({ response });
  return response.data;
};
