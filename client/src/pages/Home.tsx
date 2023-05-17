import useUser from "@src/api/hooks/useUser";

export default function Home() {
    const { data: user } = useUser();
    return <div>hello Home</div>;
}
