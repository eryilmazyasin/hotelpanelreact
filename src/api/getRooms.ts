import axios from "axios";

export const getRooms = async () => {
  const response = await axios.get("/api/rooms");
  return response.data;
};
