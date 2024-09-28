import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getRooms } from "../api/getRooms.ts";
import { IRoom } from "../api/postAddRoom.ts";

const useRooms = (): UseQueryResult<IRoom[], AxiosError> => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
  });
};
export default useRooms;
