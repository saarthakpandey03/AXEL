import SidebarHeader from "./SidebarHeader";
import SidebarHistory from "./SidebarHistory";
import ProfileMenu from "./ProfileMenu";

const Sidebar = ({
    collapsed,
    setCollapsed,
    onNewChat,
    mobile,
    recentChats,
    setRecentChats,
    onLogout,
    onSelectChat,
}) => {

    return (

        <aside
            className={`h-full bg-[#171717] flex flex-col transition-all duration-300 ${
                collapsed ? "w-20" : "w-72"
            }`}
        >

            <SidebarHeader
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                onNewChat={onNewChat}
            />

            <SidebarHistory
                collapsed={collapsed}
                recentChats={recentChats}
                setRecentChats={setRecentChats}
                onSelectChat={onSelectChat}
            />

            <ProfileMenu
                collapsed={collapsed}
                onLogout={onLogout}
            />

        </aside>

    );
};

export default Sidebar;