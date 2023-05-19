import useUnLikePost from "@src/api/hooks/useUnlikePost";
import useLikePost from "@src/api/hooks/uselikePost";
import { IPost, IUser } from "@src/types";
import { useQueryClient } from "@tanstack/react-query";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface LikeButtonProps {
    post: IPost;
    user: IUser;
}
export default function LikeButton({ post, user }: LikeButtonProps) {
    const { mutateAsync: likeAsync } = useLikePost();
    const { mutateAsync: unlikeAsync } = useUnLikePost();
    const queryClient = useQueryClient();
    const isLiked = post.likes.includes(user.id);

    const handleLike = async () => {
        if (isLiked) {
            await unlikeAsync(post.id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["post", post.id],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["posts"],
                    });
                },
            });
        } else {
            await likeAsync(post.id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["post", post.id],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["posts"],
                    });
                },
            });
        }
    };

    return (
        <button
            onClick={handleLike}
            className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 px-2 py-1 rounded-md"
        >
            {isLiked ? (
                <FcLike className="w-4 h-4 text-pink-500" />
            ) : (
                <FcLikePlaceholder className="w-4 h-4" />
            )}
            <span className="font-medium">{post.likes.length} likes</span>
        </button>
    );
}
