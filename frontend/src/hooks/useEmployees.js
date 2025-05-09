import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployees, subscribeToEmployee } from "../services/firebaseDB";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToEmployee((employees) => {
      queryClient.setQueryData(["employee"], employees);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [queryClient]);

  return useQuery({
    queryKey: ["employee"],
    queryFn: getEmployees,
  });
};
