import moment from "moment";
import { IComment } from "@src/types";
import Avatar from "../Avatar";
import { FaTrash } from "react-icons/fa";
import useGetUser from "@src/api/hooks/useGetUser";
import useDeleteComment from "@src/api/hooks/useDeleteComment";
import { useQueryClient } from "@tanstack/react-query";

interface CommentItemProps {
    comment: IComment;
    postId: string;
}

export default function CommentItem({ comment, postId }: CommentItemProps) {
    const { data: user } = useGetUser();
    const { mutateAsync } = useDeleteComment();
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        await mutateAsync(
            {
                postId,
                commentId: comment.id,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["post", postId],
                    });
                },
            }
        );
    };

    return (
        <div className="p-4">
            <div className="flex items-center mb-4">
                <Avatar src={comment.user.avatar} className="w-8 h-8 mr-2" />
                <div>
                    <p className="inline-flex items-center text-sm text-gray-900">
                        <span className="capitalize">
                            {comment.user.fname} {comment.user.lname}
                        </span>
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                        {moment(comment.createdAt).fromNow()}
                    </p>
                </div>
                {user && user.id === comment.user.id && (
                    <button
                        onClick={handleDelete}
                        className="ml-auto flex items-center gap-2 text-sm font-medium text-gray-500 hover:border-rose-500 hover:bg-rose-500 hover:text-white border border-gray-200 px-2 py-1 rounded-md transition-all duration-200"
                    >
                        <span className="">Delete</span>
                        <FaTrash className="w-3 h-3" />
                    </button>
                )}
            </div>
            <p className="text-gray-500">{comment.text}</p>
        </div>
    );
}
