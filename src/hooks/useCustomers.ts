import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "../api/getCustomers.ts";

const useCustomers = (searchTerm: string, page: number) => {
  return useQuery({
    queryKey: ["customers", searchTerm, page],
    queryFn: () => getCustomers(searchTerm, page),
  });
};

export default useCustomers;
