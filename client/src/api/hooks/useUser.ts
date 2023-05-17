import instance from "../instance";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => instance.get("/auth/me").then((res) => res.data),
    });
}
