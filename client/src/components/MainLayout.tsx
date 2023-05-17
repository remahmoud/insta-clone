import { ReactNode } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

export default function MainLayout({
    children,
    isLoading,
}: {
    children: ReactNode;
    isLoading?: boolean;
}) {
    // if loading, show spinner
    if (isLoading) {
        return <Spinner />;
    }
    // else show main layout
    return (
        <div className="container mx-auto px-4 max-w-xl lg:max-w-2xl h-full">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
