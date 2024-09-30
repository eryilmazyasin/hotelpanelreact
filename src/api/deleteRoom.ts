import axios from "axios";

export const deleteRoom = async (id) => {
  const response = await axios.delete(`/api/rooms/${id}`);
  return response.data;
};
