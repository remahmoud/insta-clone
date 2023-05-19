import instance from "../instance";
import { useQuery } from "@tanstack/react-query";
import type { IPost } from "@src/types";

export default function useGetPost(id: string) {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () =>
            instance.get<IPost>("/posts/" + id).then((res) => res.data),
    });
}
