import instance from "../instance";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "@src/types";

export default function useSuggestedUsers() {
    return useQuery({
        queryKey: ["suggestedUsers"],
        queryFn: () =>
            instance
                .get<IUser[]>("/users/suggested-to-follow")
                .then((res) => res.data),
    });
}
