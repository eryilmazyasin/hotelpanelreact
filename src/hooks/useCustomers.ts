import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getCustomers } from "../api/getCustomers";

export interface ICustomers {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  national_id: string;
  notes: string;
}

const useCustomers = (): UseQueryResult<ICustomers, AxiosError> => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });
};
export default useCustomers;
