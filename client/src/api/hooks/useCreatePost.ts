import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

export default function useCreatePost() {
    return useMutation({
        mutationFn: (body: FormData) =>
            instance.post("/posts/create", body).then((res) => res.data),
    });
}
