"use client";

import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { useState } from "react";


export const useApiMutation = (mutationFunction: any) => {
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    // You can call Convex mutations by using the TanStack useMutation hook, and setting the mutationFn property to the result of calling useConvexMutation:
    const apiMutation = useMutation({
        mutationFn: useConvexMutation(mutationFunction),
      });

    const mutate = (payload: any) => {
        setIsPending(apiMutation.isPending);
        setIsSuccess(apiMutation.isSuccess);
        setIsError(apiMutation.isError);
        return apiMutation.mutateAsync(payload)
            .then((result) => {
                return result
            })
            .catch((error) => {
                throw error
            })
            .finally(() => {
                setIsPending(apiMutation.isPending);
                setIsSuccess(apiMutation.isSuccess);
                setIsError(apiMutation.isError);
            })
    };

    return {
        mutate,
        isPending,
        isSuccess,
        isError
    }
};

