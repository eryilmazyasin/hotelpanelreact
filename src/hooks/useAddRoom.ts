import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { IRoom, postAddRoom } from "../api/postAddRoom.ts";

const useAddRoom = (): UseMutationResult<IRoom, AxiosError, IRoom> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return postAddRoom(params);
    },
    onSuccess: (newRoom) => {
      queryClient.setQueryData<IRoom[]>(["rooms"], (oldRooms) => {
        // Eğer mevcut 'rooms' yoksa yeni bir liste başlat, varsa yeni odayı ekle
        return oldRooms ? [...oldRooms, newRoom] : [newRoom];
      });
    },
  });
};
export default useAddRoom;
