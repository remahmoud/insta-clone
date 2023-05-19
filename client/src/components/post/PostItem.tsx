import { IPost } from "@src/types";

interface PostItemProps {
    post: IPost;
    children?: React.ReactNode;
}

export default function PostItem({ post, children }: PostItemProps) {
    return (
        <div className="py-6">
            <div className="flex items-center gap-2 mb-3">
                <img src={post.user.avatar} className="w-8 h-8 rounded-full" />
                <span className="font-semibold">{post.user.username}</span>
            </div>
            <img src={post.image} className="rounded-md mb-3" />
            <p className="text-gray-600 mb-3">{post.caption}</p>
            {children}
        </div>
    );
}
