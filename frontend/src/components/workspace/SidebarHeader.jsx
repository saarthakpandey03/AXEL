import {
  PanelLeft,
  PenSquare,
  Search,
  Plus
} from "lucide-react";

const SidebarHeader = ({ collapsed, setCollapsed , onNewChat}) => {
  return (
    <div className="border-b border-slate-800 p-3">

      {/* Top */}

      <div className="flex items-center gap-2">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-10 w-13 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <PanelLeft size={20} />
        </button>

        

      </div>

      {/* Actions */}

      <div className="mt-4 flex flex-col gap-1">

        <button
            type="button"
            onClick={onNewChat}
            className={`flex items-center rounded-lg text-slate-300 transition hover:bg-slate-800 ${
                collapsed
                    ? "h-10 w-10 justify-center self-center"
                    : "gap-3 px-3 py-2"
            }`}
        >
        <Plus size={18} />

            {!collapsed && (
            <span className="text-sm">
                New Chat
            </span>
            )}
        </button>

        <button
          className={`flex items-center rounded-lg text-slate-300 transition hover:bg-slate-800 ${
            collapsed
              ? "h-10 w-10 justify-center self-center"
              : "gap-3 px-3 py-2"
          }`}
        >
          <Search size={18} />

          {!collapsed && (
            <span className="text-sm">
              Search Chats
            </span>
          )}
        </button>

      </div>

    </div>
  );
};

export default SidebarHeader;