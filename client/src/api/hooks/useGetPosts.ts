import instance from "../instance";
import { useQuery } from "@tanstack/react-query";
import type { IPost } from "@src/types";

export default function useGetPosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () =>
            instance.get<IPost[]>("/posts/thread").then((res) => res.data),
    });
}
