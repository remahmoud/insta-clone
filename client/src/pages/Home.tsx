import useUser from "@src/api/hooks/useUser";
import MainLayout from "@src/components/MainLayout";
import SuggestedUsersList from "@src/components/users/SuggestedUsersList";

export default function Home() {
    const { isLoading } = useUser();
    return (
        <MainLayout isLoading={isLoading}>
            <SuggestedUsersList />
        </MainLayout>
    );
}
