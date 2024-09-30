import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { deleteRoom } from "../api/deleteRoom.ts";
import { IRoom } from "../interfaces/interface.ts";

const useDeleteRoom = (): UseMutationResult<number, AxiosError> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      console.log({ id });
      return deleteRoom(id);
    },
    onSuccess: (message, id) => {
      console.log({ message, id });
      queryClient.setQueryData<IRoom[]>(["rooms"], (oldRooms) => {
        if (!oldRooms) return [];

        // Odayı ID'ye göre filtreleyip silinen odayı listeden çıkarıyoruz
        return oldRooms.filter((room) => room.id !== id);
      });

      toast.success("Oda başarıyla silindi!");
    },
  });
};

export default useDeleteRoom;
