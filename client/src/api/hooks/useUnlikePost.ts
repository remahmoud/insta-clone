import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useUnLikePost() {
    return useMutation({
        mutationFn: (id: string) =>
            instance.post("/posts/unlike/" + id).then((res) => res.data),
    });
}
