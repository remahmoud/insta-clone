import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useFollowById() {
    return useMutation({
        mutationKey: ["suggestedUsers"],
        mutationFn: (id: string) =>
            instance.post(`/users/${id}/follow`).then((res) => res.data),
    });
}
