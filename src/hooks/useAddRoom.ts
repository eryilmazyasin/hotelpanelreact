import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { IAddRoom, postAddRoom } from "../api/postAddRoom.ts";

const useAddRoom = (): UseMutationResult<IAddRoom, AxiosError, IAddRoom> => {
  return useMutation({
    mutationFn: (params) => {
      return postAddRoom(params);
    },
    onSuccess: (data) => {
      console.log({ data });
      return data.payload;
    },
  });
};
export default useAddRoom;
