import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { postAddReservation } from "../api/postAddReservation.ts";
import { IReservation, IRoom } from "../interfaces/interface.ts";

const useAddReservation = (): UseMutationResult<
  IReservation,
  AxiosError,
  IReservation
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params) => {
      return postAddReservation(params);
    },
    onSuccess: (newReservation) => {
      const rooms = queryClient.getQueryData<IRoom[]>(["rooms"]);

      console.log({ newReservation });

      if (rooms) {
        const updatedRooms = rooms.map((room) => {
          if (room.id === newReservation.room_id) {
            return {
              ...room,
              is_reserved: true,
              Reservation: newReservation,
            };
          }
          return room;
        });

        queryClient.setQueryData(["rooms"], updatedRooms);
      }

      toast.success("Rezervasyon başarıyla kaydedildi!");
    },
  });
};
export default useAddReservation;
