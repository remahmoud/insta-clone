import { FaUserPlus } from "react-icons/fa";
import useSuggestedUsers from "@src/api/hooks/useSuggestedUsers";
import Avatar from "../Avatar";
import useFollowMutation from "@src/api/hooks/useFollowMutaion";
import { useQueryClient } from "@tanstack/react-query";

export default function SuggestedUsersList() {
    const queryClient = useQueryClient();
    const { mutateAsync } = useFollowMutation();
    const { data: users, isLoading } = useSuggestedUsers();

    const handleFollow = async (id: string) => {
        await mutateAsync(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(["suggestedUsers"]);
            },
        });
    };

    // if loading return skeleton
    if (isLoading) return <Skeleton />;

    // if no users return null
    if (!users || users.length <= 0) return null;
    return (
        <div className="grid grid-cols-2 gap-4 my-4">
            {users.map((user) => (
                <div
                    className="w-full flex items-center p-4 shadow-md border border-gray-200 rounded-md space-x-4"
                    key={user.id}
                >
                    <Avatar
                        src={user.avatar}
                        className="w-14 h-14 ring-2 ring-indigo-300 p-1"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold capitalize text-gray-600 mb-1">
                            {user.fname} {user.lname}
                        </h3>
                        <button
                            onClick={() => handleFollow(user.id)}
                            className="flex items-center justify-between text-white font-medium text-center bg-indigo-500 w-full py-1 px-3 gap-1 rounded-md"
                        >
                            <span>Follow</span>
                            <FaUserPlus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
const Skeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-4 my-4">
            {[1, 2].map((id) => (
                <div
                    key={id}
                    className="w-full animate-pulse flex gap-4 items-center p-4 shadow-md border border-gray-200 rounded-md"
                >
                    <div className="w-14 h-14 rounded-full bg-slate-200" />
                    <div className="flex-1">
                        <div className="h-2 w-full bg-slate-200 rounded mb-3" />
                        <div className="h-6 w-full bg-slate-200 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};
