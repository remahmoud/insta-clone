import { useParams } from "react-router-dom";
import MainLayout from "@src/components/MainLayout";
import useGetPost from "@src/api/hooks/useGetPost";
import PostItem from "@src/components/post/PostItem";
import LikeButton from "@src/components/post/LikeButton";
import useGetUser from "@src/api/hooks/useGetUser";
import CommentForm from "@src/components/comment/CommentForm";
import CommentItem from "@src/components/comment/CommentItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function PostDetail() {
    const { id = "" } = useParams();
    const [parent] = useAutoAnimate({ duration: 350 });
    const { data: post, isLoading } = useGetPost(id);
    const { data: user, isLoading: isUserLoading } = useGetUser();

    if (!post || !user) return null;
    return (
        <MainLayout isLoading={isLoading || isUserLoading}>
            <PostItem post={post}>
                <LikeButton post={post} user={user} />
                {post.comments.length > 0 ? (
                    <div
                        ref={parent}
                        className="flex flex-col my-4 border border-gray-200 divide-y divide-gray-200"
                    >
                        {post.comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                postId={post.id}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 my-2">No comments yet</p>
                )}

                <CommentForm postId={post.id} />
            </PostItem>
        </MainLayout>
    );
}
