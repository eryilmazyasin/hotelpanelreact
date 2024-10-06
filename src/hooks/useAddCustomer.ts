import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postAddCustomer } from "../api/postAddCustomer.ts";
import { ICustomer } from "../interfaces/interface.ts";

const useAddCustomer = (): UseMutationResult<
  ICustomer,
  AxiosError,
  ICustomer
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ICustomer) => {
      const updatedParams = {
        first_name: params.first_name,
        national_id: params.national_id,
        phone_number: params.phone_number,
      };
      return postAddCustomer(updatedParams);
    },
    onSuccess: (newCustomer, params) => {},
  });
};
export default useAddCustomer;
