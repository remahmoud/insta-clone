import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

type CreateComment = {
    id: string;
    text: string;
};

export default function useCreateComment() {
    return useMutation({
        mutationFn: (data: CreateComment) =>
            instance
                .post("/posts/comment/" + data.id, { text: data.text })
                .then((res) => res.data),
    });
}
