"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

type ActiveIcon = "list" | "search" | "notifications" | "settings";

export default function Menu() {
  const [activeIcon, setActiveIcon] = useState<ActiveIcon>("list");

  const iconClass = "h-8 w-8 text-gray-400";
  const activeClass = "text-gray-800";

  return (
    <div className="flex justify-between p-10 pt-4 border-top bg-secondary">
      <FormatListBulletedRoundedIcon
        className={cn(iconClass, activeIcon === "list" && activeClass)}
        onClick={() => setActiveIcon("list")}
      />
      <SearchRoundedIcon
        className={cn(iconClass, activeIcon === "search" && activeClass)}
        onClick={() => setActiveIcon("search")}
      />
      <NotificationsNoneRoundedIcon
        className={cn(iconClass, activeIcon === "notifications" && activeClass)}
        onClick={() => setActiveIcon("notifications")}
      />
      <SettingsOutlinedIcon
        className={cn(iconClass, activeIcon === "settings" && activeClass)}
        onClick={() => setActiveIcon("settings")}
      />
    </div>
  );
}
