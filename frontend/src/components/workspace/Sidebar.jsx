import SidebarHeader from "./SidebarHeader";
import SidebarHistory from "./SidebarHistory";
import ProfileMenu from "./ProfileMenu";

const Sidebar = ({
    collapsed,
    setCollapsed,
    onNewChat,
    mobile,
    recentChats,
    onSearch,
    setRecentChats,
    onSelectChat,
    onLogout,
}) => {

    return (
        <aside
            className={`
                relative
                flex
                h-full
                shrink-0
                flex-col
                bg-white
                text-slate-900
                transition-all
                duration-300
                dark:bg-[#171717]
                dark:text-white
                ${
                    collapsed
                        ? "w-20"
                        : "w-72"
                }
            `}
        >

            {/* HEADER */}

            <SidebarHeader
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                 onSearch={onSearch}
                onNewChat={onNewChat}
                mobile={mobile}
            />


            {/* HISTORY */}

            <SidebarHistory
                collapsed={collapsed}
                recentChats={recentChats}
                setRecentChats={setRecentChats}
                onSelectChat={onSelectChat}
            />


            {/* PROFILE */}

            <ProfileMenu
                collapsed={collapsed}
                onLogout={onLogout}
            />

        </aside>
    );
};

export default Sidebar;