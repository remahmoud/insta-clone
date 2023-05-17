import instance from "../instance";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "@src/types";

export default function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => instance.get<IUser>("/auth/me").then((res) => res.data),
    });
}
