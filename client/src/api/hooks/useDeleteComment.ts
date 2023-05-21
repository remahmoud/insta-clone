import instance from "../instance";
import { useMutation } from "@tanstack/react-query";

type DeleteComment = {
    postId: string;
    commentId: string;
};

export default function useDeleteComment() {
    return useMutation({
        mutationFn: (data: DeleteComment) =>
            instance
                .delete(`/posts/comment/${data.postId}/${data.commentId}`)
                .then((res) => res.data),
    });
}
