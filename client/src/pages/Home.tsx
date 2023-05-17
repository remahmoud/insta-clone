import useUser from "@src/api/hooks/useUser";
import MainLayout from "@src/components/MainLayout";

export default function Home() {
    const { isLoading } = useUser();
    return <MainLayout isLoading={isLoading}>hello Home</MainLayout>;
}
