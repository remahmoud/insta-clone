import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useLikePost() {
    return useMutation({
        mutationFn: (id: string) =>
            instance.post("/posts/like/" + id).then((res) => res.data),
    });
}
