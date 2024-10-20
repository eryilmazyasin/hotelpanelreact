import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { postAddCustomer } from "../api/postAddCustomer.ts";
import { ICustomers } from "../interfaces/interface.ts";

const useAddCustomer = (): UseMutationResult<
  ICustomers[],
  AxiosError,
  ICustomers[]
> => {
  const queryClient = useQueryClient();

  return useMutation({
    // Dizi halindeki müşteri bilgilerini post işlemiyle göndermek için
    mutationFn: (customers: ICustomers[]): Promise<ICustomers[]> => {
      const updatedCustomers = customers.map((customer) => ({
        first_name: customer.first_name,
        national_id: customer.national_id,
        phone_number: customer.phone_number,
      }));

      // postAddCustomer fonksiyonuna tüm müşterileri (dizi olarak) gönderiyoruz
      return postAddCustomer(updatedCustomers).then(
        (response: AxiosResponse<ICustomers[]>) => response.data // Yanıtın içindeki "data"yı alıyoruz
      );
    },
    onSuccess: (newCustomers, params) => {
      // API başarılı olursa yapılacak işlemler
      // queryClient.invalidateQueries(["customers"]);
    },
  });
};

export default useAddCustomer;
