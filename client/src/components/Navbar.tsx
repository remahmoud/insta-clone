import useUser from "@src/api/hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { data: user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };
    const openMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [isOpen]);

    return (
        <nav className="flex items-center justify-between py-3">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <Link to="/">Instagram</Link>
            </h2>
            <div className="relative">
                <Avatar
                    src={user?.avatar!}
                    alt={user?.fname}
                    onClick={openMenu}
                    className="cursor-pointer hover:grayscale transition-all duration-200"
                />
                {isOpen && (
                    <div className="absolute top-0 right-0 mt-12 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                        <div>
                            <Link
                                to={`/user/${user?.id}`}
                                className="block capitalize rounded-t-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {user?.fname} {user?.lname}
                            </Link>
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </Link>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <button
                            onClick={handleLogout}
                            className="block w-full rounded-b-md text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}