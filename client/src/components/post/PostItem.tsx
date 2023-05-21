import { FaTrash } from "react-icons/fa";
import { IPost } from "@src/types";
import useDeletePost from "@src/api/hooks/useDeletePost";
import { useQueryClient } from "@tanstack/react-query";

interface PostItemProps {
    userId: string;
    post: IPost;
    children?: React.ReactNode;
}

export default function PostItem({ post, userId, children }: PostItemProps) {
    const { mutateAsync } = useDeletePost();
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        await mutateAsync(post.id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["posts"],
                });
            },
        });
    };
    return (
        <div className="py-6">
            <div className="flex items-center gap-2 mb-3">
                <img src={post.user.avatar} className="w-8 h-8 rounded-full" />
                <span className="font-semibold">{post.user.username}</span>
                {post.user.id === userId && (
                    <button
                        onClick={handleDelete}
                        className="ml-auto flex items-center gap-2 text-sm font-medium text-gray-500 hover:border-rose-500 hover:bg-rose-500 hover:text-white border border-gray-200 px-2 py-1 rounded-md transition-all duration-200"
                    >
                        <span className="">Delete</span>
                        <FaTrash className="w-3 h-3" />
                    </button>
                )}
            </div>
            <img src={post.image} className="rounded-md mb-3" />
            <p className="text-gray-600 mb-3">{post.caption}</p>
            {children}
        </div>
    );
}
