import { LogOut } from "lucide-react";

const LogoutButton = ({
    onLogout,
}) => {
    const handleLogout = () => {
        [
            "token",
            "access_token",
            "refresh_token",
            "user",
            "session_id",
            "axel_messages",
        ].forEach((key) => {
            localStorage.removeItem(key);
        });

        if (onLogout) {
            onLogout();
        } else {
            window.location.replace(
                "/signin"
            );
        }
    };

    return (
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
            <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-red-500 transition hover:bg-red-500/10"
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
                    <LogOut size={18} />
                </div>

                <div className="text-left">
                    <p className="text-sm font-medium">
                        Log out
                    </p>

                    <p className="text-xs text-red-400/60">
                        Sign out of AXEL
                    </p>
                </div>
            </button>
        </div>
    );
};

export default LogoutButton;