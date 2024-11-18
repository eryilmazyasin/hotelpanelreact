import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { updateReservation } from '../api/updateReservation.ts';
import { IReservation } from '../interfaces/interface.ts';

const useUpdateReservation = (): UseMutationResult<
  IReservation,
  AxiosError,
  IReservation
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params) => {
      return updateReservation(params);
    },
    onSuccess: (updatedReservation) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Rezervasyon başarıyla güncellendi!");
    },
    onError: (error) => {
      toast.error("Rezervasyon güncellenemedi: " + error.message);
    },
  });
};

export default useUpdateReservation;
