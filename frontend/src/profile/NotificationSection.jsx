import { Bell } from "lucide-react";

const NotificationSection = () => {

    return (
        <div className="mt-4">

            <div className="mb-2 flex items-center gap-2 px-2">

                <Bell
                    size={16}
                    className="text-slate-500 dark:text-slate-400"
                />

                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Notifications
                </h3>

            </div>

        </div>
    );
};

export default NotificationSection;