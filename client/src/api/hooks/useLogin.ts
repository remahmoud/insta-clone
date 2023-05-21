import { TokenResponseType, LoginType } from "@src/types";
import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
    return useMutation({
        mutationFn: (data: LoginType) => {
            return instance
                .post<TokenResponseType>("/auth/login", data)
                .then((res) => res.data);
        },
    });
}
