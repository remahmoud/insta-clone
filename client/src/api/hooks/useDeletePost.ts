import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost() {
    return useMutation({
        mutationFn: (id: string) =>
            instance.delete("/posts/remove/" + id).then((res) => res.data),
    });
}
