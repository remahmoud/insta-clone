export default function Spinner() {
    return (
        <div
            role="status"
            className="flex items-center justify-center h-screen"
        >
            <div className="animate-spin rounded-full h-24 w-24 border-y-2 border-t-purple-400 border-b-pink-600"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
