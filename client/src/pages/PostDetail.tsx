import { useParams } from "react-router-dom";
import MainLayout from "@src/components/MainLayout";
import useGetPost from "@src/api/hooks/useGetPost";
import PostItem from "@src/components/post/PostItem";
import LikeButton from "@src/components/post/LikeButton";
import useGetUser from "@src/api/hooks/useGetUser";

export default function PostDetail() {
    const { id = "" } = useParams();
    const { data: post, isLoading } = useGetPost(id);
    const { data: user, isLoading: isUserLoading } = useGetUser();

    if (!post || !user) return null;

    return (
        <MainLayout isLoading={isLoading || isUserLoading}>
            <PostItem post={post}>
                <LikeButton post={post} user={user} />
            </PostItem>
        </MainLayout>
    );
}
