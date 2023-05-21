import { useAutoAnimate } from "@formkit/auto-animate/react";
import useGetPosts from "@src/api/hooks/useGetPosts";
import useGetUser from "@src/api/hooks/useGetUser";
import { FcComments } from "react-icons/fc";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import PostItem from "./PostItem";

export default function PostList() {
    const [parent] = useAutoAnimate({ duration: 350 });
    const { data: posts } = useGetPosts();
    const { data: user } = useGetUser();

    if (!posts || posts.length <= 0 || !user) return null;
    return (
        <div ref={parent} className="flex flex-col divide-y divide-gray-300">
            {posts.map((post) => (
                <PostItem userId={user.id} post={post} key={post.id}>
                    <div className="flex items-center gap-2">
                        <LikeButton post={post} user={user} />
                        <Link
                            to={`/post/${post.id}`}
                            className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 px-2 py-1 rounded-md"
                        >
                            <FcComments className="w-4 h-4" />
                            <span className="font-medium">
                                {post.comments.length} comments
                            </span>
                        </Link>
                    </div>
                </PostItem>
            ))}
        </div>
    );
}
