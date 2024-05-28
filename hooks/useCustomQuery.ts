import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
import router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IQuery {
  queryKey: QueryKey;
  enabled?: boolean;
  queryFn: QueryFunction;
}

const useCustomQuery = (query: IQuery) => {
  const {
    data: result,
    error,
    ...others
  } = useQuery({ refetchOnWindowFocus: false, retry: false, ...query });

  useEffect(() => {
    const res = result as any;
    if (res && !res?.data?.success) {
      toast.error(res?.data.message);
    } else if (error) {
      const msg = "Something went wrong, please try again";
      const err = error as any;
      if (err?.response?.status === 401) {
        localStorage.removeItem("auth");
        router.replace("/", "/");
      } else if (!err?.response?.data?.success) {
        toast.error(err?.response?.data.message || msg);
      } else {
        toast.error(err?.response?.message || msg);
      }
    }
  }, [result, error]);

  return {
    data: result as Record<string, any>,
    error,
    ...others,
  };
};

export default useCustomQuery;
