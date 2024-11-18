import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { updateRoom } from '../api/updateRoom.ts';
import { IRoom } from '../interfaces/interface.ts';

const useUpdateRoom = (): UseMutationResult<IRoom, AxiosError, IRoom> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return updateRoom(params);
    },
    onSuccess: (updatedRoom) => {
      queryClient.setQueryData<IRoom[]>(["rooms"], (oldRooms) => {
        if (!oldRooms) return [];

        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      });

      toast.success("Oda başarıyla güncellendi!");
    },
  });
};
export default useUpdateRoom;
