import useGetUser from "@src/api/hooks/useGetUser";
import MainLayout from "@src/components/MainLayout";
import PostList from "@src/components/post/PostList";
import SuggestedUsersList from "@src/components/users/SuggestedUsersList";

export default function Home() {
    const { isLoading, data: user } = useGetUser();
    if (!user) return null;
    return (
        <MainLayout isLoading={isLoading}>
            <SuggestedUsersList />
            <PostList />
        </MainLayout>
    );
}
