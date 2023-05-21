import { TokenResponseType, RegisterType } from "@src/types";
import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterType) => {
            return instance
                .post<TokenResponseType>("/auth/register", data)
                .then((res) => res.data);
        },
    });
}
